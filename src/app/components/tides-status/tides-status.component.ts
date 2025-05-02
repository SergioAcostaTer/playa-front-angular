import { Component, Input, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType, Chart, Plugin } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { TideService, TideData } from '../../services/tide.service';
import { Beach } from '../../models/beach';
import 'chartjs-adapter-date-fns';

// Plugin for current time line
const currentTimePlugin: Plugin<'line'> = {
  id: 'currentTimeLine',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const xAxis = chart.scales['x'];
    const yAxis = chart.scales['y'];

    const now = new Date();
    const x = xAxis.getPixelForValue(now.getTime());

    if (x && !isNaN(x)) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 2;
      ctx.moveTo(x, yAxis.top);
      ctx.lineTo(x, yAxis.bottom);
      ctx.stroke();

      ctx.fillStyle = '#ff4444';
      ctx.font = '12px Arial';
      const label = '';
      const textWidth = ctx.measureText(label).width;
      const labelX = x - textWidth / 2;
      const labelY = yAxis.top + 20;
      ctx.fillRect(labelX - 2, labelY - 12, textWidth + 4, 16);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, labelY);
      ctx.restore();
    }
  },
};

// Register plugin
Chart.register(currentTimePlugin);

@Component({
  selector: 'app-tides-status',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './tides-status.component.html',
  styleUrls: ['./tides-status.component.css'],
})
export class TidesStatusComponent implements OnInit {
  @Input() beach!: Beach;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [] as { x: number; y: number }[],
        label: 'Altura de la marea (m)',
        borderColor: '#1e90ff',
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mareas del Día',
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
          tooltipFormat: 'HH:mm',
        },
        title: { display: true, text: 'Hora' },
      },
      y: {
        title: { display: true, text: 'Altura (m)' },
        beginAtZero: true,
      },
    },
  };

  public lineChartType: 'line' = 'line';
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  private currentDate: string;
  public isBrowser: boolean;

  constructor(
    private tideService: TideService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadTideData();
      setInterval(() => {
        if (this.chart) {
          this.chart.update();
        }
      }, 60000); // Every minute
    }
  }

  private loadTideData(): void {
    if (!this.beach || !this.beach.latitude || !this.beach.longitude) {
      this.errorMessage = 'No se proporcionaron coordenadas válidas para la playa';
      this.isLoading = false;
      return;
    }

    this.tideService
      .getTideData(this.beach.latitude, this.beach.longitude, this.currentDate)
      .subscribe({
        next: (data: TideData[]) => {
          if (data.length === 0) {
            this.errorMessage = 'No hay datos de mareas disponibles para esta playa';
          } else {
            this.updateChartData(data);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = `Error al cargar datos de mareas: ${err.message}`;
          this.isLoading = false;
        },
      });
  }

  private updateChartData(data: TideData[]): void {
    this.lineChartData.datasets[0].data = data.map((item) => ({
      x: new Date(item.timestamp).getTime(),
      y: item.height,
    }));

    this.lineChartOptions!.plugins!.title!.text = `Mareas en ${this.beach.name} (${this.currentDate})`;

    if (this.chart) {
      this.chart.update();
    }
  }
}

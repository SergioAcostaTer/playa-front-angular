import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DailyWeather, HourlyWeather } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html'
})
export class WeatherDisplayComponent implements OnChanges {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  
  weatherDays: DailyWeather[] = [];
  selectedDayIndex: number = 0;
  isLoading: boolean = false;
  
  currentDate: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  currentTime: string = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'] || changes['longitude']) {
      this.fetchWeatherData();
    }
  }

  private fetchWeatherData(): void {
    if (!this.latitude || !this.longitude) {
      this.weatherDays = [];
      return;
    }
    this.isLoading = true;
    this.weatherService.getDailyWeatherData(this.latitude, this.longitude).subscribe({
      next: (data) => {
        this.weatherDays = data;
        this.selectedDayIndex = 0;
        this.isLoading = false;
      },
      error: () => {
        this.weatherDays = [];
        this.isLoading = false;
      }
    });
  }

  selectDay(index: number): void {
    this.selectedDayIndex = index;
  }


  getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌦️';
    if (code >= 71 && code <= 77) return '🌨️';
    if (code >= 80 && code <= 86) return '🌧️';
    if (code >= 95) return '⛈️';
    return '❓';
  }

  get today(): DailyWeather {
    return this.weatherDays[this.selectedDayIndex] ?? {
      date: '',
      tempMax: 0,
      tempMin: 0,
      precipitation: 0,
      weathercode: 0,
      windSpeedMax: 0,
      windDirectionDominant: 0,
      uvIndexMax: 0,
      sunrise: '',
      sunset: '',
      avgHumidity: 0,
      avgPressure: 0
    };
  }
}
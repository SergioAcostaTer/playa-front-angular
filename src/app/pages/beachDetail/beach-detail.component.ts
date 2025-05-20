import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { MaplibreMapComponent } from '../../maplibre-map/maplibre-map.component';
import { Beach } from '../../models/beach';

import { BeachCommentsComponent } from '../../components/beach-comments/beach-comments.component';
import { TidesStatusComponent } from '../../components/tides-status/tides-status.component';
import { WeatherDisplayComponent } from '../../components/weather-display/weather-display.component';
import { BeachService } from '../../services/beach.service';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [
    CommonModule,
    BeachDetailLayoutComponent,
    MaplibreMapComponent,
    WeatherDisplayComponent,
    TidesStatusComponent,
    BeachCommentsComponent,
    BeachCommentsComponent,
  ],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailPageComponent implements OnInit {
  beach: Beach | null = null;
  beaches: Beach[] | null = null;
  beachService = inject(BeachService);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.beaches = await this.beachService.getAllBeaches();

    if (slug) {
      this.beach = await this.beachService.getBeachBySlug(slug);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { MaplibreMapComponent } from '../../maplibre-map/maplibre-map.component';
import { Beach } from '../../models/beach';

import { BeachCommentsComponent } from '../../components/beach-comments/beach-comments.component';
import { TidesStatusComponent } from '../../components/tides-status/tides-status.component';
import { WeatherDisplayComponent } from '../../components/weather-display/weather-display.component';
import { getBeachBySlug } from '../../services/getBeachById';

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

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      // Find the beach with a matching normalized name
      this.beach = await getBeachBySlug(slug);
    }
  }
}

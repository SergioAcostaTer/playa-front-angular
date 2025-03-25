import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { BeachMapComponent } from '../../components/beach-map/beach-map.component';
import { BeachDescriptionComponent } from '../../components/beach-description/beach-description.component';
import { Beach } from '../../models/beach';
import { Comment } from '../../models/comment';
import { MaplibreMapComponent } from "../../maplibre-map/maplibre-map.component";

import { getBeachBySlug } from '../../services/getBeachById';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [
    CommonModule,
    BeachDetailLayoutComponent,
    BeachDescriptionComponent
],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailPageComponent implements OnInit {
  beach: Beach | null = null;
  beaches: Beach[] = []

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.beaches = await getAllBeaches();

    if (slug) {
      // Find the beach with a matching normalized name
      this.beach = await getBeachBySlug(slug);
    }
  }

}

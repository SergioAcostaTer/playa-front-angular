import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as maplibre from 'maplibre-gl';

@Component({
  selector: 'app-maplibre-map',
  templateUrl: './maplibre-map.component.html',
  styleUrls: ['./maplibre-map.component.css']
})
export class MaplibreMapComponent implements OnInit, OnChanges {
  @Input() latitude: number = 51.5074;
  @Input() longitude: number = -0.1278;
  @Input() zoom: number = 12;

  private map: maplibre.Map | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      if (changes['latitude'] || changes['longitude']) {
        this.updateMap();
      }
    }
  }

  private initMap(): void {
    this.map = new maplibre.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/satellite/style.json?key=bI4oYGzzakPOHE0Vtk5q',
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
    });

    new maplibre.Marker()
      .setLngLat([this.longitude, this.latitude])
      .addTo(this.map);
  }

  private updateMap(): void {
    if (this.map) {
      this.map.setCenter([this.longitude, this.latitude]);
      this.map.setZoom(this.zoom);
    }
  }
}

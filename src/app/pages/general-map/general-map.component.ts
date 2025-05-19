// app-general-map.component.ts

import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BeachService } from '../../services/beach.service';
import { Beach } from '../../models/beach';
import { CANARY_ISLANDS_CONFIG, BALEARIC_ISLANDS_CONFIG } from '../../constants/location-config';
import { LocationConfig } from '../../models/location-config';
import * as maplibre from 'maplibre-gl';

@Component({
  selector: 'app-general-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-map.component.html',
  styleUrls: ['./general-map.component.css'],
})
export class GeneralMapComponent implements OnInit, AfterViewInit {
  beaches: Beach[] = [];
  loading: boolean = true;
  error: string | null = null;
  userLocation: [number, number] | null = null;
  private map: maplibre.Map | undefined;
  private markers: maplibre.Marker[] = [];
  private locationConfig: LocationConfig = CANARY_ISLANDS_CONFIG;

  constructor(
    private beachService: BeachService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadBeaches();
    this.getUserLocation();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initMap();
      }, 100);
    }
  }

  private async loadBeaches() {
    try {
      this.beaches = await this.beachService.getMapBeaches();
      console.log('All beaches loaded:', this.beaches);
      console.log('Number of beaches loaded:', this.beaches.length);
      this.loading = false;
      if (this.map && this.map.isStyleLoaded()) {
        this.addMarkers();
        this.fitBounds();
      }
    } catch (error) {
      console.error('Error fetching beaches:', error);
      this.error = 'Failed to load beaches. Please try again later.';
      this.loading = false;
    }
  }

  private getUserLocation() {
    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = [position.coords.longitude, position.coords.latitude];
          console.log('User location:', this.userLocation);
          if (this.map && this.map.isStyleLoaded()) {
            this.addUserMarker();
            this.centerMapOnUserIfInCanary();
          }
        },
        (error) => {
          console.warn('Unable to get user location:', error.message);
        }
      );
    } else {
      console.warn('Geolocation not supported or not in browser');
    }
  }

  private isUserInCanary(): boolean {
    if (!this.userLocation) return false;
    const [lng, lat] = this.userLocation;
    return (
      lat >= this.locationConfig.bounds.minLat &&
      lat <= this.locationConfig.bounds.maxLat &&
      lng >= this.locationConfig.bounds.minLng &&
      lng <= this.locationConfig.bounds.maxLng
    );
  }

  private centerMapOnUserIfInCanary() {
    if (this.isUserInCanary() && this.userLocation) {
      console.log('Centering map on user location within Canary Islands');
      this.map?.setCenter(this.userLocation);
      this.map?.setZoom(12);
    } else {
      console.log('User location not in Canary Islands or unavailable, using default center');
      this.map?.setCenter(this.locationConfig.defaultCenter);
      this.map?.setZoom(this.locationConfig.defaultZoom);
    }
  }

  private initMap() {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Map initialization skipped: Not in browser');
      return;
    }

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container #map not found in DOM');
      this.error = 'Map container not found. Please check the template.';
      return;
    }

    try {
      this.map = new maplibre.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/satellite/style.json?key=bI4oYGzzakPOHE0Vtk5q',
        center: this.locationConfig.defaultCenter, // Use config
        zoom: this.locationConfig.defaultZoom,     // Use config
        attributionControl: false,
      });

      const navControl = new maplibre.NavigationControl({
        showCompass: true, // Mostrar la brújula
        showZoom: true,    // Mostrar botones de zoom
        visualizePitch: false // Opcional: muestra el ángulo de inclinación
      });
      this.map.addControl(navControl, 'top-right'); // Posición del control: 'top-right', 'top-left', 'bottom-right', 'bottom-left'

      this.map.on('load', () => {
        console.log('Map loaded successfully');
        mapContainer.style.display = 'none';
        mapContainer.offsetHeight;
        mapContainer.style.display = '';

        setTimeout(() => {
          const dimensions = mapContainer.getBoundingClientRect();
          console.log('Map container dimensions:', dimensions.width, dimensions.height);
          if (dimensions.width === 0 || dimensions.height === 0) {
            console.error('Map container has zero dimensions');
            this.error = 'Map container has zero width or height. Please check CSS or parent elements.';
            let parent = mapContainer.parentElement;
            while (parent) {
              const parentRect = parent.getBoundingClientRect();
              console.log(`Parent dimensions (class: ${parent.className}):`, parentRect.width, parentRect.height);
              parent = parent.parentElement;
            }
            return;
          }
          if (this.beaches.length > 0) {
            this.addMarkers();
            this.fitBounds();
          }
          if (this.userLocation) {
            this.addUserMarker();
            this.centerMapOnUserIfInCanary();
          }
        }, 100);
      });

      this.map.on('error', (e) => {
        console.error('Map error:', e.error);
        this.error = 'Failed to load map. Please check your internet connection or API key. Error: ' + (e.error?.message || 'Unknown error');
      });

      this.map.on('styledata', () => {
        if (!this.map?.isStyleLoaded()) {
          console.error('Primary style failed to load, attempting satellite fallback');
          this.map?.setStyle('https://api.maptiler.com/maps/satellite/style.json?key=bI4oYGzzakPOHE0Vtk5q');
        }
      });
    } catch (err) {
      console.error('Map initialization failed:', err);
      this.error = 'Failed to initialize map. Error: ' + (err || 'Unknown error');
    }
  }

  private addMarkers() {
    if (!this.map) return;

    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    this.beaches.forEach((beach) => {
      if (beach.latitude && beach.longitude) {
        const markerColor = beach.blueFlag ? '#0099cc' : '#ff385c';

        const marker = new maplibre.Marker({ color: markerColor })
          .setLngLat([beach.longitude, beach.latitude])
          .setPopup(
            new maplibre.Popup().setHTML(`
              <h3 style="margin: 0 0 8px; font-size: 16px; color: #222; font-weight: bold;">${beach.name}</h3>
              <img src="${beach.coverUrl}" alt="${beach.name}" style="width: 100%; height: auto; border-radius: 6px; margin-bottom: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 6px; font-size: 14px; color: #555;">
                ${beach.island}, ${beach.municipality}
              </div>
              <div style="margin-bottom: 8px; font-size: 14px; color: #555;">
                <span style="font-weight: 500;">Puntuación:</span> ${beach.grade} <span style="color: #FFD700;">★</span>
              </div>
              <a href="/beach/${beach.slug}" style="display: inline-block; font-size: 14px; color: #007bff; text-decoration: none; font-weight: 500; transition: color 0.2s;">View Details</a>
            `)
          )
          .addTo(this.map!);

        this.markers.push(marker);
      }
    });

    console.log('All markers added, total markers:', this.markers.length);
  }

  private addUserMarker() {
    if (!this.map || !this.userLocation) return;

    const userIcon = document.createElement('div');
    userIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#3399FF" class="bi bi-pin-fill" viewBox="0 0 16 16">
        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708 SacramentalesV2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
      </svg>
    `;

    const userMarker = new maplibre.Marker({ element: userIcon })
      .setLngLat(this.userLocation)
      .setPopup(new maplibre.Popup().setHTML('<b>Tu localización</b>'))
      .addTo(this.map);
    this.markers.push(userMarker);
    console.log('User marker (custom star) added at:', this.userLocation);
  }

  private fitBounds() {
    if (!this.map || this.beaches.length === 0) return;

    const validBeaches = this.beaches.filter(
      (beach) => beach.latitude && beach.longitude
    );

    if (validBeaches.length === 0) {
      console.warn('No valid beaches to fit bounds');
      this.centerMapOnUserIfInCanary();
      return;
    }

    const bounds = new maplibre.LngLatBounds();
    validBeaches.forEach((beach) =>
      bounds.extend([beach.longitude, beach.latitude])
    );

    if (this.userLocation) {
      bounds.extend(this.userLocation);
    }

    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15,
    });
    console.log('Map bounds fitted');
  }
}

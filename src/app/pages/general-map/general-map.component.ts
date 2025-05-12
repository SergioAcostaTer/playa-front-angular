import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BeachService } from '../../services/beach.service';
import { Beach } from '../../models/beach';
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
      this.initMap();
    }
  }

  private async loadBeaches() {
    try {
      this.beaches = await this.beachService.getAllBeaches();
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
        // Replace YOUR_MAPTILER_KEY with a valid key
        style: 'https://api.maptiler.com/maps/satellite/style.json?key=YOUR_MAPTILER_KEY',
        center: [-16.6291, 28.2916], // Canary Islands
        zoom: 8,
        attributionControl: false,
      });

      this.map.on('load', () => {
        console.log('Map loaded successfully');
        const dimensions = mapContainer.getBoundingClientRect();
        console.log('Map container dimensions:', dimensions.width, dimensions.height);
        if (dimensions.width === 0 || dimensions.height === 0) {
          console.error('Map container has zero dimensions');
          this.error = 'Map container has zero width or height. Please check CSS.';
          return;
        }
        if (this.beaches.length > 0) {
          this.addMarkers();
          this.fitBounds();
        }
        if (this.userLocation) {
          this.addUserMarker();
        }
      });

      this.map.on('error', (e) => {
        console.error('Map error:', e.error);
        this.error = 'Failed to load map. Please check your internet connection or API key. Error: ' + (e.error?.message || 'Unknown error');
      });

      this.map.on('styledata', () => {
        if (!this.map?.isStyleLoaded()) {
          console.error('Primary style failed to load, attempting fallback');
          // Use MapLibre's demo style as a fallback
          this.map?.setStyle('https://demotiles.maplibre.org/style.json');
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
        const marker = new maplibre.Marker({ color: '#FF0000' })
          .setLngLat([beach.longitude, beach.latitude])
          .setPopup(
            new maplibre.Popup().setHTML(`
              <b>${beach.name}</b><br>
              Island: ${beach.island}<br>
              Municipality: ${beach.municipality}<br>
              <a href="/beaches/${beach.id}">View Details</a>
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
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#0000FF" stroke="#FFFFFF" stroke-width="2"/>
      </svg>
    `;

    const userMarker = new maplibre.Marker({ element: userIcon })
      .setLngLat(this.userLocation)
      .setPopup(new maplibre.Popup().setHTML('<b>Your Location</b>'))
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
      this.map.setCenter([-16.6291, 28.2916]);
      this.map.setZoom(8);
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

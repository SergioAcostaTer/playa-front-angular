import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-beach-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-card.component.html',
  styleUrls: ['./beach-card.component.css'],
  host: { class: 'beach-card' },
})
export class BeachCardComponent implements OnInit {
  @Input() beach: Beach | null = null;
  distance: string | null = null;

  ngOnInit() {
    if (this.beach && this.beach.latitude && this.beach.longitude) {
      this.getUserLocation();
    }
  }

  // Get user's current location
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          if (this.beach) {
            this.distance = this.calculateDistance(
              userLat,
              userLon,
              this.beach.latitude,
              this.beach.longitude
            );
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          this.distance = 'Unable to retrieve location';
        }
      );
    } else {
      this.distance = 'Geolocation not supported';
    }
  }

  // Haversine formula to calculate distance between two points
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): string {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.degToRad(lat2 - lat1);
    const dLon = this.degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(lat1)) *
      Math.cos(this.degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return `${distance.toFixed(2)} km`;
  }

  // Convert degrees to radians
  private degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

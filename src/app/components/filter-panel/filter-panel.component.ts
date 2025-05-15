import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
})
export class FilterPanelComponent implements OnInit {
  @Input() selectedIsland: string = '';
  @Input() islands: Category[] = [];
  @Output() filtersChange = new EventEmitter<any>();

  filters = {
    searchMode: 'filters' as 'filters' | 'proximity',
    useProximityFilter: false,
    island: '',
    hasLifeguard: false,
    hasSand: false,
    hasRock: false,
    hasShowers: false,
    hasToilets: false,
    hasFootShowers: false,
    grade: null as number | null,
    useGradeFilter: false,
    latitude: null as number | null,
    longitude: null as number | null,
    proximityRadius: 1,
  };

  isLocationAvailable: boolean = false;
  locationError: string | null = null;

  ngOnInit() {
    this.filters.island = this.selectedIsland;   // Initialize with selectedIsland
    this.checkLocationAvailability(); // Initial geolocation check
  }

  trackById(index: number, island: Category): string {
    return island.id;
  }

  checkLocationAvailability() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isLocationAvailable = true;
          this.filters.latitude = position.coords.latitude;
          this.filters.longitude = position.coords.longitude;
          this.locationError = null;
          // Emit filters if in proximity mode to ensure updated location is used
          if (this.filters.useProximityFilter) {
            this.onFilterChange();
          }
        },
        (error) => {
          this.isLocationAvailable = false;
          this.locationError = 'No se pudo obtener la ubicación';
          this.filters.latitude = null;
          this.filters.longitude = null;
          console.error('Location error:', error);
        }
      );
    } else {
      this.isLocationAvailable = false;
      this.locationError = 'La geolocalización no está soportada';
      this.filters.latitude = null;
      this.filters.longitude = null;
    }
  }

  onIslandChange(island: string) {
    this.filters.island = island;
    this.onFilterChange();
  }

  onFilterChange() {
    // Determine the new search mode
    const newSearchMode = this.filters.useProximityFilter ? 'proximity' : 'filters';

    // If switching to proximity mode, fetch geolocation
    if (newSearchMode === 'proximity' && !this.filters.latitude && !this.filters.longitude) {
      this.checkLocationAvailability();
    }

    // Reset filters based on the new mode
    if (newSearchMode !== this.filters.searchMode) {
      if (newSearchMode === 'filters') {
        // Reset proximity-related filters
        this.filters.latitude = null;
        this.filters.longitude = null;
        this.filters.proximityRadius = 1;
      } else {
        // Reset filter-related filters
        this.filters.island = '';
        this.filters.hasLifeguard = false;
        this.filters.hasSand = false;
        this.filters.hasRock = false;
        this.filters.hasShowers = false;
        this.filters.hasToilets = false;
        this.filters.hasFootShowers = false;
        this.filters.grade = null;
        this.filters.useGradeFilter = false;
      }
    }

    // Update search mode
    this.filters.searchMode = newSearchMode;

    // Only emit if location is available in proximity mode
    if (newSearchMode === 'proximity' && (!this.filters.latitude || !this.filters.longitude)) {
      return; // Wait for geolocation callback to emit
    }

    // Emit the updated filters
    this.filtersChange.emit(this.filters);
  }
}
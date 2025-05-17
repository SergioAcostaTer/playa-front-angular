import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
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
  @Input() searchQuery: string = '';
  @Input() islands: Category[] = [];
  @Output() filtersChange = new EventEmitter<any>();

  filters = {
    searchMode: 'filters' as 'filters' | 'proximity',
    useProximityFilter: false,
    name: '',
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
  private isPageReloaded: boolean = true;

  @HostListener('window:load')
  onPageLoad() {
    this.isPageReloaded = true;
  }

  ngOnInit() {
    if (this.isPageReloaded) {
      this.resetFilters();
      this.isPageReloaded = false;
    } else {
      this.filters.island = this.selectedIsland;
      this.filters.name = this.searchQuery;
    }
    this.checkLocationAvailability();
  }

  private resetFilters() {
    this.filters = {
      searchMode: 'filters',
      useProximityFilter: false,
      name: '',
      island: '',
      hasLifeguard: false,
      hasSand: false,
      hasRock: false,
      hasShowers: false,
      hasToilets: false,
      hasFootShowers: false,
      grade: null,
      useGradeFilter: false,
      latitude: null,
      longitude: null,
      proximityRadius: 1,
    };
    this.filtersChange.emit(this.filters);
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
          if (this.filters.useProximityFilter) {
            this.onFilterChange();
          }
        },
        (error) => {
          this.isLocationAvailable = false;
          this.locationError = 'No se pudo obtener la ubicación: ' + error.message;
          this.filters.latitude = null;
          this.filters.longitude = null;
          console.error('Location error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
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
    const newSearchMode = this.filters.useProximityFilter ? 'proximity' : 'filters';

    if (newSearchMode === 'proximity' && !this.filters.latitude && !this.filters.longitude) {
      this.checkLocationAvailability();
    }

    // Establecer grade a 3 como valor por defecto cuando useGradeFilter se activa
    if (this.filters.useGradeFilter && this.filters.grade === null) {
      this.filters.grade = 3;
    }

    if (newSearchMode !== this.filters.searchMode) {
      if (newSearchMode === 'filters') {
        this.filters.latitude = null;
        this.filters.longitude = null;
        this.filters.proximityRadius = 1;
      } else {
        this.filters.island = ''; // Solo island se limpia en modo proximity
      }
    }

    this.filters.searchMode = newSearchMode;

    if (newSearchMode === 'proximity' && (!this.filters.latitude || !this.filters.longitude)) {
      return;
    }

    this.filtersChange.emit(this.filters);
  }
}
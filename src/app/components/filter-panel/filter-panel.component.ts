import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
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
export class FilterPanelComponent implements OnInit, OnChanges {
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

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('window:load')
  onPageLoad() {
    console.log('FilterPanel: Page reloaded (F5 detected)');
    this.resetFilters();
    this.filtersChange.emit(this.filters);
    this.cdr.detectChanges(); // Forzar actualización del <select>
  }

  ngOnInit() {
    console.log('FilterPanel ngOnInit - selectedIsland:', this.selectedIsland, 'searchQuery:', this.searchQuery);
    this.filters.island = this.selectedIsland;
    this.filters.name = this.searchQuery;

    if (this.filters.island || this.filters.name) {
      console.log('Emitting initial filters:', this.filters);
      this.filtersChange.emit(this.filters);
    }

    this.cdr.detectChanges();
    this.checkLocationAvailability();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedIsland']) {
      console.log('selectedIsland changed to:', this.selectedIsland);
      this.filters.island = this.selectedIsland;
      this.cdr.detectChanges(); // Forzar actualización del <select>
      // No emitimos filtros aquí para evitar un bucle infinito,
      // ya que SearchComponent ya ha actualizado la URL y los resultados.
    }
    if (changes['searchQuery']) {
      this.filters.name = this.searchQuery;
    }
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
    console.log('Island changed to:', island);
    this.filters.island = island;
    this.onFilterChange();
  }

  onFilterChange() {
    const newSearchMode = this.filters.useProximityFilter ? 'proximity' : 'filters';

    if (this.filters.useGradeFilter && this.filters.grade === null) {
      this.filters.grade = 3;
    }

    if (newSearchMode === 'proximity' && !this.filters.latitude && !this.filters.longitude) {
      this.checkLocationAvailability();
    }

    if (newSearchMode !== this.filters.searchMode) {
      if (newSearchMode === 'filters') {
        this.filters.latitude = null;
        this.filters.longitude = null;
        this.filters.proximityRadius = 1;
      } else {
        this.filters.island = '';
      }
    }

    this.filters.searchMode = newSearchMode;

    if (newSearchMode === 'proximity' && (!this.filters.latitude || !this.filters.longitude)) {
      return;
    }

    console.log('Emitting changed filters:', this.filters);
    this.filtersChange.emit(this.filters);
  }
}
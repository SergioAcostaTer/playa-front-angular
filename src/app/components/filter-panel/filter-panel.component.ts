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

  isLocationAvailable: boolean = false; // Controla si la ubicación está disponible
  locationError: string | null = null; // Mensaje de error si falla la geolocalización

  filters = {
    island: '',
    hasLifeguard: false,
    hasSand: false,
    hasRock: false,
    hasShowers: false,
    hasToilets: false,
    hasFootShowers: false,
    grade: 1,
    useGradeFilter: false,
    useProximityFilter: false,
    proximityRadius: 1,
    searchMode: 'filters' as 'filters' | 'proximity',
    latitude: null as number | null, // Nueva: coordenada del usuario
    longitude: null as number | null, // Nueva: coordenada del usuario
  };

  ngOnInit() {
    this.getUserLocation(); // Intentar obtener la ubicación al inicializar
  }

  ngOnChanges() {
    this.filters.island = this.selectedIsland;
  }

  // Obtener la ubicación del usuario
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.filters.latitude = position.coords.latitude;
          this.filters.longitude = position.coords.longitude;
          this.isLocationAvailable = true;
          this.onFilterChange(); // Emitir filtros si ya está en modo proximidad
        },
        (error) => {
          console.error('Error getting location:', error);
          this.isLocationAvailable = false;
          this.locationError = 'No se pudo obtener la ubicación';
          this.filters.useProximityFilter = false; // Forzar modo filtros
          this.filters.searchMode = 'filters';
          this.onFilterChange(); // Emitir filtros actualizados
        }
      );
    } else {
      this.isLocationAvailable = false;
      this.locationError = 'Geolocalización no soportada';
      this.filters.useProximityFilter = false;
      this.filters.searchMode = 'filters';
      this.onFilterChange();
    }
  }

  trackById(index: number, category: Category): string {
    return category.id;
  }

  onFilterChange() {
    // Sincronizar searchMode con useProximityFilter
    if (this.isLocationAvailable) {
      this.filters.searchMode = this.filters.useProximityFilter ? 'proximity' : 'filters';
    } else {
      this.filters.searchMode = 'filters';
      this.filters.useProximityFilter = false; // Prevenir modo proximidad
    }

    // Preparar los filtros a emitir según el modo
    const filtersToEmit = {
      searchMode: this.filters.searchMode,
      ...(this.filters.searchMode === 'filters' ? {
        island: this.filters.island,
        hasLifeguard: this.filters.hasLifeguard,
        hasSand: this.filters.hasSand,
        hasRock: this.filters.hasRock,
        hasShowers: this.filters.hasShowers,
        hasToilets: this.filters.hasToilets,
        hasFootShowers: this.filters.hasFootShowers,
        grade: this.filters.useGradeFilter ? this.filters.grade : null,
        useGradeFilter: this.filters.useGradeFilter,
      } : {
        proximityRadius: this.filters.proximityRadius,
        latitude: this.filters.latitude,
        longitude: this.filters.longitude,
      }),
    };
    this.filtersChange.emit(filtersToEmit);
  }

  onIslandChange(value: string) {
    this.filters.island = value;
    this.onFilterChange();
  }
}
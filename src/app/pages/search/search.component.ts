// src/app/pages/search/search.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { Beach } from '../../models/beach';
import { searchBeaches } from '../../services/search';
import { debounceTime, switchMap, Subject } from 'rxjs';
import { Category } from '../../models/category';
import { getCategories } from '../../services/getCategories';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, BeachGridComponent, FilterPanelComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  beaches: Beach[] = [];
  categories: Category[] = [];
  loading = true;
  searchQuery: string = '';
  islandFilter: string = '';
  filters = {
    island: '',
    hasLifeguard: false,
    hasSand: false,
    hasRock: false,
    hasShowers: false,
    hasToilets: false,
    hasFootShowers: false,
  };
  private searchSubject = new Subject<{
    query: string;
    filters: {
      island: string;
      hasLifeguard: boolean;
      hasSand: boolean;
      hasRock: boolean;
      hasShowers: boolean;
      hasToilets: boolean;
      hasFootShowers: boolean;
    };
  }>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    // Cargar las categorías (islas)
    this.categories = await getCategories();

    // Configurar el pipeline de búsqueda con debounce
    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap(({ query, filters }) => {
          this.loading = true;
          return searchBeaches(query, 1, 30, filters);
        })
      )
      .subscribe({
        next: (beaches) => {
          this.beaches = beaches;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        },
      });

    // Leer los parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.filters.island = params['island'] || '';
      this.islandFilter = this.filters.island;
      this.filters.hasLifeguard = params['hasLifeguard'] === 'true';
      this.filters.hasSand = params['hasSand'] === 'true';
      this.filters.hasRock = params['hasRock'] === 'true';
      this.filters.hasShowers = params['hasShowers'] === 'true';
      this.filters.hasToilets = params['hasToilets'] === 'true';
      this.filters.hasFootShowers = params['hasFootShowers'] === 'true';

      this.searchSubject.next({ query: this.searchQuery, filters: this.filters });
    });
  }

  updateQueryParams(query: string, filters: typeof this.filters) {
    const queryParams: { [key: string]: string | undefined } = {
      q: query.trim() || undefined,
      island: filters.island || undefined,
      // Solo incluir los filtros booleanos si están en true
      hasLifeguard: filters.hasLifeguard ? 'true' : undefined,
      hasSand: filters.hasSand ? 'true' : undefined,
      hasRock: filters.hasRock ? 'true' : undefined,
      hasShowers: filters.hasShowers ? 'true' : undefined,
      hasToilets: filters.hasToilets ? 'true' : undefined,
      hasFootShowers: filters.hasFootShowers ? 'true' : undefined,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });

    this.searchSubject.next({ query: query.trim(), filters });
    this.loading = true;
  }

  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.updateQueryParams(query, this.filters);
  }

  onFiltersChange(filters: typeof this.filters) {
    this.filters = filters;
    this.islandFilter = filters.island;
    this.updateQueryParams(this.searchQuery, filters);
  }
}
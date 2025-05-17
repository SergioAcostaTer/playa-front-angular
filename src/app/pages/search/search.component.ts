import { Component, inject, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Beach } from '../../models/beach';
import { debounceTime, switchMap, Subject } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { SearchService } from '../../services/search.service';

interface Filters {
  name: string;
  island: string;
  hasLifeguard: boolean;
  hasSand: boolean;
  hasRock: boolean;
  hasShowers: boolean;
  hasToilets: boolean;
  hasFootShowers: boolean;
  grade: number | null;
  useGradeFilter: boolean;
}

interface ProximityParams {
  latitude: number | null;
  longitude: number | null;
  proximityRadius: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent,
    FilterPanelComponent,
    PaginationComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  beaches: Beach[] = [];
  categories: Category[] = [];
  categoriesService = inject(CategoriesService);
  loading = true;
  searchQuery: string = '';
  islandFilter: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 30;
  searchMode: 'filters' | 'proximity' = 'filters';
  filters: Filters = {
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
  };
  proximityParams: ProximityParams = {
    latitude: null,
    longitude: null,
    proximityRadius: 1,
  };
  errorMessage: string | null = null;
  private searchSubject = new Subject<{
    query: string;
    page: number;
    searchMode: 'filters' | 'proximity';
    filters: Filters;
    proximityParams: ProximityParams;
  }>();
  searchService = inject(SearchService);
  private initialIsland: string | null = null;
  private isInitialLoad: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  @HostListener('window:load')
  onPageLoad() {
    console.log('Page reloaded (F5 detected)');
    this.resetFilters();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: '',
    });
  }

  async ngOnInit() {
    this.categories = await this.categoriesService.getCategories();

    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap(({ query, page, searchMode, filters, proximityParams }) => {
          this.loading = true;
          if (searchMode === 'filters') {
            return this.searchService.searchBeaches(query, page, this.limit, filters);
          } else {
            if (proximityParams.latitude != null && proximityParams.longitude != null) {
              return this.searchService.searchBeachesByProximity(
                proximityParams.latitude,
                proximityParams.longitude,
                proximityParams.proximityRadius,
                page,
                this.limit,
                filters
              );
            } else {
              throw new Error('Ubicación no disponible');
            }
          }
        })
      )
      .subscribe({
        next: (response) => {
          this.beaches = response.data || [];
          this.currentPage = response.pagination?.currentPage || 1;
          this.totalPages = response.pagination?.totalPages || 1;
          this.limit = response.pagination?.limit || this.limit;
          this.loading = false;
          this.errorMessage = null;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Error al buscar playas';
          console.error('Search failed:', error);
        },
      });

    this.route.queryParams.subscribe((params) => {
      console.log('Query params received:', params);
      this.searchQuery = params['name'] || params['q'] || '';
      this.currentPage = Number(params['page']) || 1;
      this.searchMode = params['lat'] && params['lon'] && params['radius'] ? 'proximity' : 'filters';

      if (params['island']) {
        this.initialIsland = params['island'];
        this.filters.island = params['island'];
        this.islandFilter = params['island'];
      } else {
        this.filters.island = this.initialIsland || '';
        this.islandFilter = this.initialIsland || '';
      }

      this.filters.name = this.searchQuery;
      this.filters.hasLifeguard = params['hasLifeguard'] === 'true';
      this.filters.hasSand = params['hasSand'] === 'true';
      this.filters.hasRock = params['hasRock'] === 'true';
      this.filters.hasShowers = params['hasShowers'] === 'true';
      this.filters.hasToilets = params['hasToilets'] === 'true';
      this.filters.hasFootShowers = params['hasFootShowers'] === 'true';
      this.filters.grade = params['grade'] ? Number(params['grade']) : null;
      this.filters.useGradeFilter = params['grade'] !== undefined;

      if (this.searchMode === 'proximity') {
        this.proximityParams.latitude = params['lat'] ? Number(params['lat']) : null;
        this.proximityParams.longitude = params['lon'] ? Number(params['lon']) : null;
        this.proximityParams.proximityRadius = params['radius'] ? Number(params['radius']) : 1;
      } else {
        this.proximityParams = { latitude: null, longitude: null, proximityRadius: 1 };
      }

      console.log('Initial filters:', this.filters);
      this.searchSubject.next({
        query: this.searchQuery,
        page: this.currentPage,
        searchMode: this.searchMode,
        filters: this.filters,
        proximityParams: this.proximityParams,
      });
    });
  }

  private resetFilters() {
    this.searchQuery = '';
    this.islandFilter = '';
    this.currentPage = 1;
    this.searchMode = 'filters';
    this.filters = {
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
    };
    this.proximityParams = {
      latitude: null,
      longitude: null,
      proximityRadius: 1,
    };
    this.initialIsland = null;
    this.isInitialLoad = true;
  }

  updateQueryParams(
    query: string,
    page: number,
    searchMode: 'filters' | 'proximity',
    filters: Filters,
    proximityParams: ProximityParams
  ) {
    const queryParams: { [key: string]: string | number | undefined } = {};

    if (page !== 1) {
      queryParams['page'] = String(page);
    }

    if (filters.name) queryParams['name'] = filters.name;
    if (filters.hasLifeguard) queryParams['hasLifeguard'] = 'true';
    if (filters.hasSand) queryParams['hasSand'] = 'true';
    if (filters.hasRock) queryParams['hasRock'] = 'true';
    if (filters.hasShowers) queryParams['hasShowers'] = 'true';
    if (filters.hasToilets) queryParams['hasToilets'] = 'true';
    if (filters.hasFootShowers) queryParams['hasFootShowers'] = 'true';
    if (filters.useGradeFilter && filters.grade != null) {
      queryParams['grade'] = String(filters.grade);
    }

    if (searchMode === 'filters') {
      if (filters.island) queryParams['island'] = filters.island;
    } else {
      if (proximityParams.latitude != null) queryParams['lat'] = String(proximityParams.latitude);
      if (proximityParams.longitude != null) queryParams['lon'] = String(proximityParams.longitude);
      queryParams['radius'] = String(proximityParams.proximityRadius);
    }

    console.log('Updating query params:', queryParams);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
    });

    this.searchSubject.next({ query: query.trim(), page, searchMode, filters, proximityParams });
    this.loading = true;
  }

  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.filters.name = query;
    this.currentPage = 1;
    this.updateQueryParams(this.searchQuery, this.currentPage, this.searchMode, this.filters, this.proximityParams);
  }

  onFiltersChange(filters: any) {
    console.log('Filters received from FilterPanel:', filters);
    const newSearchMode = filters.searchMode || 'filters';
    this.searchMode = newSearchMode;

    this.filters = {
      name: filters.name || '',
      island: newSearchMode === 'filters' ? (filters.island || '') : '',
      hasLifeguard: filters.hasLifeguard || false,
      hasSand: filters.hasSand || false,
      hasRock: filters.hasRock || false,
      hasShowers: filters.hasShowers || false,
      hasToilets: filters.hasToilets || false,
      hasFootShowers: filters.hasFootShowers || false,
      grade: filters.useGradeFilter ? filters.grade : null,
      useGradeFilter: filters.useGradeFilter || false,
    };
    this.islandFilter = this.filters.island;
    this.searchQuery = this.filters.name;
    console.log('Passing islandFilter to FilterPanel:', this.islandFilter);

    this.proximityParams = {
      latitude: newSearchMode === 'proximity' ? filters.latitude : null,
      longitude: newSearchMode === 'proximity' ? filters.longitude : null,
      proximityRadius: filters.proximityRadius || 1,
    };

    this.currentPage = 1;
    this.isInitialLoad = false;
    console.log('Updated filters:', this.filters);
    this.updateQueryParams(this.searchQuery, this.currentPage, this.searchMode, this.filters, this.proximityParams);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateQueryParams(this.searchQuery, page, this.searchMode, this.filters, this.proximityParams);
  }
}
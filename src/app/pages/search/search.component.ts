import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { Beach } from '../../models/beach';
import { Category } from '../../models/category';
import { debounceTime, switchMap, Subject } from 'rxjs';
import { SearchBeaches } from '../../services/searchBeaches.service'; // Importamos la clase correcta
import { GetCategoriesService } from '../../services/getCategories.service'; // Importamos el servicio de categorías

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent,
    FilterPanelComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  beaches: Beach[] = [];
  categories: Category[] = [];
  loading = false;
  searchQuery: string = '';
  islandFilter: string = '';
  filters = {
    hasLifeguard: false,
    hasSand: false,
    hasRock: false,
    hasShowers: false,
    hasToilets: false,
    hasFootShowers: false,
  };
  private searchSubject = new Subject<{ query: string; island: string; filters: any }>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchBeachService: SearchBeaches, // Inyectamos correctamente el servicio
    private getCategoriesService: GetCategoriesService // Inyectamos el servicio de categorías
  ) {}

  async ngOnInit() {
    try {
      this.categories = await this.getCategoriesService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap(({ query, island, filters }) => {
          this.loading = true;
          return this.searchBeachService.searchBeaches(query, { island, ...filters });
        })
      )
      .subscribe({
        next: (beaches) => {
          this.beaches = beaches;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching beaches:', error);
          this.loading = false;
        },
      });

    this.route.queryParams.subscribe((params) => {
      const query = params['q'] || '';
      const island = params['island'] || '';
      this.searchQuery = query;
      this.islandFilter = island;
      this.triggerSearch();
    });
  }

  triggerSearch() {
    this.searchSubject.next({
      query: this.searchQuery,
      island: this.islandFilter,
      filters: this.filters,
    });
  }

  updateQueryParams() {
    const queryParams: { [key: string]: string | null } = {};
    if (this.searchQuery.trim()) {
      queryParams['q'] = this.searchQuery.trim();
    } else {
      queryParams['q'] = null; // Remove query param if empty
    }

    if (this.islandFilter.trim()) {
      queryParams['island'] = this.islandFilter.trim();
    } else {
      queryParams['island'] = null; // Explicitly remove island param if empty
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSearchInputChange(event: any) {
    this.searchQuery = event.target.value;
    this.updateQueryParams();
    this.triggerSearch();
  }

  onFiltersChange(filters: any) {
    this.islandFilter = filters.island || '';
    this.filters = {
      hasLifeguard: filters.hasLifeguard,
      hasSand: filters.hasSand,
      hasRock: filters.hasRock,
      hasShowers: filters.hasShowers,
      hasToilets: filters.hasToilets,
      hasFootShowers: filters.hasFootShowers,
    };
    this.updateQueryParams();
    this.triggerSearch();
  }
}

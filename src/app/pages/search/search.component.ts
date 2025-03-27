// src/app/search/search.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { Beach } from '../../models/beach';
import { debounceTime, switchMap, Subject } from 'rxjs';
import { searchBeaches } from '../../services/searchBeaches';
import { getCategories } from '../../services/getCategories';
import { Category } from '../../models/category';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent,
    FilterPanelComponent
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
  private searchQuerySubject = new Subject<{ query: string, island: string }>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    
    getCategories().then(categories => {
      this.categories = categories;
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });

    this.searchQuerySubject.pipe(
      debounceTime(500),
      switchMap(({ query, island }) => {
        this.loading = true;
        return searchBeaches(query, island);
      })
    ).subscribe({
      next: (beaches) => {
        this.beaches = beaches;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching beaches:', error);
        this.loading = false;
      }
    });

    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      const island = params['island'] || '';
      this.searchQuery = query;
      this.islandFilter = island;
      this.searchQuerySubject.next({ query, island });
    });
  }

  updateQueryParam(query: string, island: string) {
    const queryParams: { [key: string]: string } = {};
    if (query.trim()) queryParams['q'] = query.trim();
    if (island.trim()) queryParams['island'] = island.trim();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
    this.searchQuerySubject.next({ query, island });
    this.loading = true;
  }

  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.updateQueryParam(query, this.islandFilter);
  }

  onIslandChange(island: string) {
    this.islandFilter = island;
    this.updateQueryParam(this.searchQuery, island);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { Beach } from '../../models/beach';
import { searchBeaches } from '../../services/search';
import { categoriesList } from '../../constants/categoriesList';
import { debounceTime, switchMap, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryListComponent,
    BeachGridComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  categories = categoriesList;
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';
  private searchQuerySubject = new Subject<string>();  // Subject to handle search query changes

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Set up the debounced search pipeline first
    this.searchQuerySubject.pipe(
      debounceTime(500), // Wait for 500ms after the user stops typing
      switchMap((query: string) => {
        this.loading = true; // Set loading to true before fetching
        return searchBeaches(query); // Call the search API/service with the query
      })
    ).subscribe({
      next: (beaches) => {
        this.beaches = beaches;  // Update beaches with the search result
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching beaches:', error);
        this.loading = false;
      }
    });

    // Listen to query parameter changes and trigger the search
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      this.searchQuery = query;
      this.searchQuerySubject.next(query);
    });
  }

  // Update the URL with the search query
  updateQueryParam(query: string) {
    if (query.trim()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: query.trim() },
        queryParamsHandling: 'merge', // Merge with existing query params
      });
      this.searchQuerySubject.next(query);  // Trigger the search with the updated query
      this.loading = true;  // Set loading to true while fetching
    }
  }

  // Listen to input changes and update the URL/query parameter
  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.updateQueryParam(query);
  }
}
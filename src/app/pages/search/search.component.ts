import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { Beach } from '../../models/beach';
import { searchBeaches } from '../../services/search';
import { debounceTime, switchMap, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';
  private searchQuerySubject = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchQuerySubject.pipe(
      debounceTime(500),
      switchMap((query: string) => {
        this.loading = true;
        return searchBeaches(query);
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
      this.searchQuery = query;
      this.searchQuerySubject.next(query);
    });
  }

  updateQueryParam(query: string) {
    if (query.trim()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: query.trim() },
        queryParamsHandling: 'merge',
      });
      this.searchQuerySubject.next(query);
      this.loading = true;
    }
  }

  // Listen to input changes and update the URL/query parameter
  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.updateQueryParam(query);
  }
}
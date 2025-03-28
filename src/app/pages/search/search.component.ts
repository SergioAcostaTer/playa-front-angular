// src/app/pages/search/search.component.ts
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
  imports: [CommonModule, FormsModule, BeachGridComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';
  island: string = '';
  private searchQuerySubject = new Subject<{ query: string; island: string }>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.searchQuerySubject
      .pipe(
        debounceTime(500),
        switchMap(({ query, island }) => {
          this.loading = true;
          return searchBeaches(query, 1, 30, island);
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

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.island = params['island'] || '';
      this.searchQuerySubject.next({ query: this.searchQuery, island: this.island });
    });
  }

  updateQueryParam(query: string) {
    if (query.trim() || this.island) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: query.trim() || undefined, island: this.island || undefined },
        queryParamsHandling: 'merge',
      });
      this.searchQuerySubject.next({ query: query.trim(), island: this.island });
      this.loading = true;
    }
  }

  onSearchInputChange(event: any) {
    const query = event.target.value;
    this.updateQueryParam(query);
  }
}
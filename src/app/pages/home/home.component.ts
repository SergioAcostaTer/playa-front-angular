import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Corrected import
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { getAllBeaches } from '../../services/getBeaches';
import { getCategories } from '../../services/getCategories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryListComponent,
    BeachGridComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  searchQuery = '';
  searchSuggestions: any[] = [];
  showSuggestions = false;
  loading = true;
  beaches: any[] = [];
  categories: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => this.fetchSuggestions(query));

    this.initializeData();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showSuggestions = false;
  }

  private async initializeData() {
    try {
      [this.categories, this.beaches] = await Promise.all([
        getCategories(),
        getAllBeaches()
      ]);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    } finally {
      this.loading = false;
    }
  }

  onSearchChange(query: string) {
    if (!query.trim()) {
      this.searchSuggestions = [];
      this.showSuggestions = false;
    } else {
      this.searchSubject.next(query);
    }
  }

  async fetchSuggestions(query: string) {
    try {
      const response = await fetch(`http://localhost:8000/beaches/searchSuggestions?q=${encodeURIComponent(query)}`);
      const result = await response.json();
      this.searchSuggestions = result.data || [];
      this.showSuggestions = true;
    } catch (e) {
      console.error('Failed to fetch suggestions', e);
    }
  }

  goToBeach(slug: string) {
    this.router.navigate(['/beach', slug]);
    this.showSuggestions = false;
  }

  searchBeaches() {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery) {
      this.router.navigate(['/search'], { queryParams: { q: trimmedQuery } });
      this.showSuggestions = false;
    }
  }
}

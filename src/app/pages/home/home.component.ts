import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
// import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { Beach } from '../../models/beach';
import { getAllBeaches } from '../../services/getBeaches';
import { Category } from '../../models/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // CategoryListComponent,
    BeachGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  categories: Category[] = [];
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      this.beaches = await getAllBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    } finally {
      this.loading = false;
    }
  }

  searchBeaches() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
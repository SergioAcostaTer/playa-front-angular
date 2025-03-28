import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { Beach } from '../../models/beach';
import { Category } from '../../models/category';
import { GetCategoriesService } from '../../services/getCategories.service'; // Ruta corregida
import { GetBeachesService } from '../../services/get-beaches.service'; // Ruta correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent,
    CategoryListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  categories: Category[] = [];
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private getCategoriesService: GetCategoriesService,
    private getBeachesService: GetBeachesService
  ) {}

  async ngOnInit() {
    try {
      // Cargar playas y categorías en paralelo para mejorar el rendimiento
      const [beaches, categories] = await Promise.all([
        this.getBeachesService.getBeaches(),
        this.getCategoriesService.getCategories(),
      ]);
      this.beaches = beaches;
      this.categories = categories;
    } catch (error) {
      console.error('Error loading data:', error);
      this.beaches = []; // Fallback en caso de error
      this.categories = []; // Fallback en caso de error
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

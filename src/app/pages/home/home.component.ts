// src/app/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getBeaches } from '../../services/getBeaches';
import { getCategories } from '../../services/getCategories';
import { Beach } from '../../models/beach';
import { Category } from '../../models/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, BeachGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  categories: Category[] = [];
  beaches: Beach[] = [];
  loading = true;

  async ngOnInit() {
    try {
      this.beaches = await getBeaches();
      this.categories = await getCategories();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    } finally {
      this.loading = false;
    }
  }
}

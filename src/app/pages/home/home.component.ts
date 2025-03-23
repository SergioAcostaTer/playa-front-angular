// src/app/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getHomeBeaches } from '../../services/getHomeBeaches';
import { Beach } from '../../models/beach';
import { categoriesList } from '../../constants/categoriesList';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, BeachGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  categories = categoriesList;
  beaches: Beach[] = [];
  loading = true;

  async ngOnInit() {
    try {
      this.beaches = await getHomeBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    } finally {
      this.loading = false;
    }
  }
}

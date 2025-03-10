import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { categoriesList } from '../../constants/categoriesList';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getHomeBeaches } from '../../services/getHomeBeaches';

@Component({
  selector: 'Home',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, BeachGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit {
  categories = categoriesList;
  beaches = [];

  async ngOnInit() {
    try {
      this.beaches = await getHomeBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    }
  }
}

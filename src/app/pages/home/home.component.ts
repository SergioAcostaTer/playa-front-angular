import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';
import { beachesList } from '../../constants/beachesList';
import { categoriesList } from '../../constants/categoriesList';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';

@Component({
  selector: 'Home',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, BeachGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent {
  beaches = beachesList;
  categories = categoriesList;
}

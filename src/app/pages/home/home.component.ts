import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';
import { beachesList } from '../../constants/beachesList';
import { categoriesList } from '../../constants/categoriesList';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'Home',
  standalone: true,
  imports: [CommonModule, BeachCardComponent, CategoryListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent {
  beaches = beachesList;
  categories = categoriesList;
}

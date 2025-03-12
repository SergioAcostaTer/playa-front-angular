import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ CommonModule, CategoryComponent ],
  templateUrl: './category-list.component.html',
  styleUrls: [ './category-list.component.css' ],
})
export class CategoryListComponent {
  @Input() categories: { name: string, image: string }[] = [];

  trackByName(index: number, category: { name: string }): string {
    return category.name;
  }
}

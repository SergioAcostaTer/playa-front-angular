import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ CommonModule, CategoryComponent ],
  templateUrl: './category-list.component.html',
  styleUrls: [ './category-list.component.css' ],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];

  trackById(index: number, category: { id: string }): string {
    return category.id;
  }
}

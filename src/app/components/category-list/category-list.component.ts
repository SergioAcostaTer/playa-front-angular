import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-category-list',
  imports: [ CommonModule, CategoryComponent ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  @Input() categories: { name: string, image: string }[] = [];
}

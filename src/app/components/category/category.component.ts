// src/app/components/category/category.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  @Input() category!: Category;

  constructor(private router: Router) {
    console.log('CategoryComponent inicializado');
  }

  onCategoryClick() {
    console.log('Clickaste en ' + this.category.name);
    this.router.navigate(['/search'], {
      queryParams: { island: this.category.name }
    });
  }
}
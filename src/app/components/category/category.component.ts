// src/app/components/category/category.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  private _router = inject(Router);
  @Input() category!: Category;
  
  
  onCategoryClick() {
    console.log('Clickaste en ' + this.category.name);
    this._router.navigate(['/search'], {
      queryParams: { island: this.category.name }
    });
  }
}
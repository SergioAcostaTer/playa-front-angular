import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor(private router: Router) {}

  onCategoryClick() {
    console.log('Category clicked:', this.category.name);
    this.router.navigate(['/search'], {
      queryParams: { island: this.category.name },
    });
  }
}
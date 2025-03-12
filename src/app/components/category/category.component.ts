import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './category.component.html',
  styleUrls: [ './category.component.css', ],
})
export class CategoryComponent {
  @Input() category!: string;
  @Input() categoryImage!: string;
}

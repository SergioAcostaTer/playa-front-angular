// src/app/components/filter-panel/filter-panel.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent {
  @Input() selectedIsland: string = '';
  @Output() islandChange = new EventEmitter<string>();
  @Input() islands: Category[] = [];
  
  trackById(index: number, category: { id: string }): string {
      return category.id;
  }

  onIslandChange(event: any) {
    this.islandChange.emit(event.target.value);
  }
}
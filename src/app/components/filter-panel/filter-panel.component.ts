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
  @Input() islands: Category[] = [];
  @Output() filtersChange = new EventEmitter<any>();

  filters = {
    island: '',
    hasLifeguard: false,
    hasSand: false,
    hasRock: false,
    hasShowers: false,
    hasToilets: false,
    hasFootShowers: false
  };

  ngOnChanges() {
    this.filters.island = this.selectedIsland;
  }

  trackById(index: number, category: Category): string {
    return category.id;
  }

  onFilterChange() {
    this.filtersChange.emit({ ...this.filters });
  }

  onIslandChange(value: string) {
    this.filters.island = value;
    this.onFilterChange();
  }
}
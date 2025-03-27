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

  // Individual filter properties
  hasLifeguard: boolean = false;
  hasSand: boolean = false;
  hasRock: boolean = false;
  hasShowers: boolean = false;
  hasToilets: boolean = false;
  hasFootShowers: boolean = false;

  trackById(index: number, category: Category): string {
    return category.id;
  }

  onFilterChange() {
    this.filtersChange.emit({
      island: this.selectedIsland,
      hasLifeguard: this.hasLifeguard,
      hasSand: this.hasSand,
      hasRock: this.hasRock,
      hasShowers: this.hasShowers,
      hasToilets: this.hasToilets,
      hasFootShowers: this.hasFootShowers
    });
  }

  onIslandChange(event: any) {
    this.selectedIsland = event.target.value;
    this.onFilterChange();
  }
}
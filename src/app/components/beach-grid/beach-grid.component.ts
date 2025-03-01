import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BeachCardComponent } from '../beach-card/beach-card.component';

@Component({
  selector: 'app-beach-grid',
  imports: [ CommonModule, BeachCardComponent ],
  templateUrl: './beach-grid.component.html',
  styleUrl: './beach-grid.component.css'
})
export class BeachGridComponent {
  @Input() beaches: { 
          imageUrl: string,
          title: string, 
          rating: string, 
          distance: string, 
          recommended?: boolean 
  }[] = [];
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beach-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-card.component.html',
  styleUrls: ['./beach-card.component.css'],
  host: { 'class': 'card' }
})
export class BeachCardComponent {
  @Input() imageUrl: string = 'assets/default-beach.jpg';
  @Input() title: string = 'Playa Desconocida';
  @Input() rating: string = '0';
  @Input() distance: string = 'N/A';
  @Input() recommended?: boolean = false;
  @Input() description?: string;
}

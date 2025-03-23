import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-beach-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-card.component.html',
  styleUrls: ['./beach-card.component.css'],
  host: { 'class': 'beach-card' }
})
export class BeachCardComponent {
  @Input() beach: Beach | null = null;
}

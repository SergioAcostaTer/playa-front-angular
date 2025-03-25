import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-ranking-card',
  standalone: true,
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.css'],
  imports: [CommonModule],
})
export class RankingCardComponent {
  @Input() beach: Beach | null = null;
}

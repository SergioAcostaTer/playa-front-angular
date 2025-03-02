import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-card',
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.css'],
  imports: [CommonModule],
})
export class RankingCardComponent {
  @Input() title!: string;
  @Input() imageUrl!: string;
  @Input() rating!: string;
  @Input() distance!: string;
  @Input() description!: string;
  @Input() recommended?: boolean = false;
}

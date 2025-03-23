import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RankingCardComponent } from '../ranking-card/ranking-card.component';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-ranking-list',
  standalone: true,
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css'],
  imports: [CommonModule, RankingCardComponent],
})
export class RankingListComponent {
  @Input() beaches: Beach[] = [];

  trackById(index: number, beach: Beach): string {
    return beach.id;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RankingCardComponent } from '../ranking-card/ranking-card.component';

interface Beach {
  title: string;
  imageUrl: string;
  rating: number;
  distance: string;
  description: string;
  recommended: boolean;
}

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css'],
  imports: [CommonModule, RankingCardComponent],
})
export class RankingListComponent {
  @Input() beaches: { 
    imageUrl: string; 
    title: string; 
    rating: string; 
    distance: string; 
    recommended?: boolean; 
    description: string; 
  }[] = [];
}

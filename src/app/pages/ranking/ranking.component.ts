import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { Beach } from '../../models/beach';
import {SearchBeaches} from '../../services/searchBeaches.service';

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent, RankingListComponent],
  templateUrl: './ranking.component.html',
  styleUrls: [],
})
export class RankingPageComponent implements OnInit {
  beaches: Beach[] = [];

  constructor(
    private searchBeachesService: SearchBeaches // Inject the SearchBeaches service
  ) {}

  ngOnInit() {
    this.loadBlueFlagBeaches();
  }

  async loadBlueFlagBeaches() {
    try {
      this.beaches = await this.searchBeachesService.getBlueFlagBeaches();
      console.log('Blue Flag Beaches loaded:', this.beaches);
    } catch (error) {
      console.error('Error loading blue flag beaches:', error);
      this.beaches = []; // Fallback in case of error
    }
  }
}

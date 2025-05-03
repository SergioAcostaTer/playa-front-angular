import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { getRankingByIsland } from '../../services/getRankingByIsland';
import { getCategories } from '../../services/getCategories';
import { Category } from '../../models/category';
import { RankingNavComponent } from '../../components/ranking-nav/ranking-nav.component';

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TitlePageComponent, RankingListComponent, RankingNavComponent],
  templateUrl: './ranking.component.html',
})
export class RankingPageByIslandComponent implements OnInit {
  categories: Category[] | any = getCategories();
  beaches = [];
  islandSlug = '';
  islandName = '';

  constructor(private route: ActivatedRoute) {} 

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.islandSlug = params.get('island') ?? '';
      this.islandName = this.slugToName(this.islandSlug);

      try {
        [this.categories, this.beaches] = await Promise.all([
                getCategories(),
                getRankingByIsland(this.islandName)
              ]);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    });
  }

  private slugToName(slug: string): string {
    // Converts "gran-canaria" → "Gran Canaria"
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { RankingNavComponent } from '../../components/ranking-nav/ranking-nav.component';
import { Category } from '../../models/category';
import { RankingService } from '../../services/ranking.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TitlePageComponent, RankingListComponent, RankingNavComponent],
  templateUrl: './ranking.component.html',
})
export class RankingPageComponent implements OnInit{
  categories: Category[] | any = [];
  beaches = [];
  rankingService = inject(RankingService);
  categoriesService = inject(CategoriesService);

  async ngOnInit() {
    try {
      [this.categories, this.beaches] = await Promise.all([
              this.categoriesService.getCategories(),
              this.rankingService.getRanking()
            ]);
    } catch (error) {}
  }
}
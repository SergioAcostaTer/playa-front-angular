import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { getRanking } from '../../services/getRanking';
import { getCategories } from '../../services/getCategories';
import { RankingNavComponent } from '../../components/ranking-nav/ranking-nav.component';
import { Category } from '../../models/category';

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TitlePageComponent, RankingListComponent, RankingNavComponent],
  templateUrl: './ranking.component.html',
})
export class RankingPageComponent implements OnInit{
  categories: Category[] | any = [];
  beaches = [];

  async ngOnInit() {
    try {
      [this.categories, this.beaches] = await Promise.all([
              getCategories(),
              getRanking()
            ]);
    } catch (error) {}
  }
}
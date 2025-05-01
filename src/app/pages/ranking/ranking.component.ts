import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { categoriesList } from '../../constants/categoriesList';
import { getRanking } from '../../services/getRanking';
@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent, RankingListComponent],
  templateUrl: './ranking.component.html',
  styleUrls: [],
})
export class RankingPageComponent {
  categories = categoriesList;
  beaches = [];

  async ngOnInit() {
    try {
      this.beaches = await getRanking();
    } catch (error) {}
  }
}

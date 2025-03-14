import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from "../../components/title-page/title-page.component";
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { categoriesList } from '../../constants/categoriesList';
import { getHomeBeaches } from '../../services/getHomeBeaches';
@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent, RankingListComponent],
  templateUrl: './ranking.component.html',
  styleUrls: [ ],
})
export class RankingPageComponent {
    categories = categoriesList;
    beaches = [];
  
    async ngOnInit() {
      try {
        this.beaches = await getHomeBeaches();
      } catch (error) {
        console.error('Error fetching beaches:', error);
      }
    }
}

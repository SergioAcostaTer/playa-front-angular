import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from "../../components/title-page/title-page.component";
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { categoriesList } from '../../constants/categoriesList';
import { getAllBeaches } from '../../services/getBeaches';
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
        this.beaches = await getAllBeaches();
      } catch (error) {
        console.error('Error fetching beaches:', error);
      }
    }
}

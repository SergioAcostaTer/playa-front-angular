import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { categoriesList } from '../../constants/categoriesList';
import { Beach } from '../../models/beach';
import {BeachService} from '../../services/beach.service'; // Importamos el modelo Beach

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent, RankingListComponent],
  templateUrl: './ranking.component.html',
  styleUrls: [],
})
export class RankingPageComponent {
  categories = categoriesList;
  beaches: Beach[] = []; // Tipamos la propiedad beaches

  constructor(private getBeachesService: BeachService) {} // Inyectamos el servicio
//TODO Fix the ranking to work
  async ngOnInit() {
    try {
      // this.beaches = await this.getBeachesService.getAllBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
      this.beaches = []; // Fallback en caso de error
    }
  }
}

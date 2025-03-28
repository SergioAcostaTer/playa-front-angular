import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
import { categoriesList } from '../../constants/categoriesList';
import { GetBeachesService } from '../../services/get-beaches.service'; // Importamos el servicio
import { Beach } from '../../models/beach'; // Importamos el modelo Beach

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

  constructor(private getBeachesService: GetBeachesService) {} // Inyectamos el servicio

  async ngOnInit() {
    try {
      this.beaches = await this.getBeachesService.getBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
      this.beaches = []; // Fallback en caso de error
    }
  }
}

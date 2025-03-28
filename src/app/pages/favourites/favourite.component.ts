import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { GetBeachesService } from '../../services/get-beaches.service'; // Importamos el servicio
import { Beach } from '../../models/beach'; // Importamos el modelo Beach

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachGridComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
})
export class FavouritePageComponent {
  beaches: Beach[] = []; // Tipamos la propiedad beaches
  loading = true;

  constructor(private getBeachesService: GetBeachesService) {} // Inyectamos el servicio

  async ngOnInit() {
    try {
      this.beaches = await this.getBeachesService.getBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
      this.beaches = []; // Fallback en caso de error
    } finally {
      this.loading = false;
    }
  }
}

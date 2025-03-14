import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { categoriesList } from '../../constants/categoriesList';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getHomeBeaches } from '../../services/getHomeBeaches';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachGridComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
})
export class FavouritePageComponent {
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

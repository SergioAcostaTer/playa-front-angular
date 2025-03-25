import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { categoriesList } from '../../constants/categoriesList';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getBeaches } from '../../services/getBeaches';
import { getCategories } from '../../services/getCategories';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachGridComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
})
export class FavouritePageComponent {
  categories = [];
  beaches = [];
  loading = true;

  async ngOnInit() {
    try {
      this.beaches = await getBeaches();
      this.categories = await getCategories();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    } finally {
      this.loading = false;
    }
  }
}
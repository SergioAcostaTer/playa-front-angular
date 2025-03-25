import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { getAllBeaches } from '../../services/getBeaches';

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
      this.beaches = await getAllBeaches();
    } catch (error) {
      console.error('Error fetching beaches:', error);
    } finally {
      this.loading = false;
    }
  }
}
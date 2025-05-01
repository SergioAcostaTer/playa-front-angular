import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FavoritesService } from '../../services/favourites.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachGridComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
})
export class FavouritePageComponent implements OnInit {
  beaches: Beach[] = [];
  loading = true;

  private authStateService = inject(AuthStateService);
  private favoritesService = inject(FavoritesService);

  ngOnInit() {
    this.authStateService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.favoritesService.getFavoriteBeachesDetails(user.uid).subscribe({
            next: (beaches) => {
              this.beaches = beaches;
              this.loading = false;
            },
            error: (error) => {
              console.error('Error fetching favorite beaches:', error);
              this.beaches = [];
              this.loading = false;
            },
            complete: () => {
            },
          });
        } else {
          console.log('No authenticated user found');
          this.beaches = [];
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error subscribing to user state:', error);
        this.beaches = [];
        this.loading = false;
      },
      complete: () => {
      },
    });
  }
}
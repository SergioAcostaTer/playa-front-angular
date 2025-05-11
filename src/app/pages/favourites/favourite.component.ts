import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { FavouritesService } from '../../services/favourites.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachGridComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
})
export class FavouritePageComponent implements OnInit {
  beaches: any[] = [];
  loading = true;
  error: string | null = null;
  user: any = null;

  constructor(
    private favouritesService: FavouritesService,
    private userSerive: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.user = await this.userSerive.getMe();
    } catch (error) {
      console.error('Error fetching user:', error);
      this.user = null;
      this.router.navigate(['/login']);
      return;
    }

    if (this.user) {
      this.loadFavourites();
    }
  }

  loadFavourites() {
    this.favouritesService.getFavourites().subscribe({
      next: (response) => {
        console.log('Respuesta de getFavourites:', response);
        this.beaches = response.data.map((item: any) => item.beach_grades); // Cambia 'beaches' por 'beach_grades'
        console.log('Playas asignadas a this.beaches:', this.beaches);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las playas favoritas:', error);
        this.error = 'No se pudieron cargar tus playas favoritas. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      }
    });
  }
}
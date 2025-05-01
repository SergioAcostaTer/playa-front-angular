import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beach } from '../../models/beach';
import { FavouritesService } from '../../services/favourites.service';
import { getMe } from '../../services/getMe';

@Component({
  selector: 'app-beach-detail-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail-layout.component.html',
  styleUrls: ['./beach-detail-layout.component.css'],
})
export class BeachDetailLayoutComponent implements OnInit {
  @Input() beach!: Beach;
  user: any = null;
  isFavourite: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private favouritesService: FavouritesService
  ) {}

  async ngOnInit() {
    // Verificar si el usuario está autenticado
    try {
      this.user = await getMe();
    } catch (error) {
      console.error('Error fetching user:', error);
      this.user = null;
    }

    // Si el usuario está autenticado, verificar si la playa está en favoritos
    if (this.user) {
      this.checkIfFavourite();
    }
  }

  // Verificar si la playa está en la lista de favoritos
  checkIfFavourite() {
    const beachId = Number(this.beach.id);
    this.favouritesService.checkIfFavourite(beachId).subscribe({
      next: (isFavourite) => {
        this.isFavourite = isFavourite;
      },
      error: (error) => {
        console.error('Error al verificar favoritos:', error);
        alert(
          'Error al verificar si la playa está en favoritos: ' + error.message
        );
      },
    });
  }

  // Método para manejar el clic en el botón de favoritos (añadir o quitar)
  onFavoriteClick(): void {
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;
    const beachId = Number(this.beach.id);

    if (this.isFavourite) {
      // Quitar de favoritos
      this.favouritesService.removeFromFavourites(beachId).subscribe({
        next: (response) => {
          console.log('Playa eliminada de favoritos:', response.message);
          this.isFavourite = false;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al eliminar de favoritos:', error);
          this.isLoading = false;
          alert('Error al eliminar la playa de favoritos: ' + error.message);
        },
      });
    } else {
      // Añadir a favoritos
      this.favouritesService.addToFavourites(beachId).subscribe({
        next: (response) => {
          console.log('Playa añadida a favoritos:', response.message);
          this.isFavourite = true;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al añadir a favoritos:', error);
          this.isLoading = false;
          alert('Error al añadir la playa a favoritos: ' + error.message);
        },
      });
    }
  }
}

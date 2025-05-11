import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner'; // Import toast
import { Beach } from '../../models/beach';
import { FavouritesService } from '../../services/favourites.service';
import { UserService } from '../../services/user.service';

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
  userService = inject(UserService);

  constructor(
    private router: Router,
    private favouritesService: FavouritesService
  ) {}

  async ngOnInit() {
    // Verificar si el usuario está autenticado
    try {
      this.user = await this.userService.getMe();
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
      error: (error: any) => {
        console.error('Error al verificar favoritos:', error);
        if (error.status === 401) {
          toast.error('Por favor, inicia sesión para verificar favoritos');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al verificar si la playa está en favoritos');
        }
      },
    });
  }

  // Método para manejar el clic en el botón de favoritos (añadir o quitar)
  onFavoriteClick(): void {
    if (!this.user) {
      toast.error('Por favor, inicia sesión para gestionar favoritos');
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
          toast.success('Playa eliminada de favoritos');
        },
        error: (error: any) => {
          console.error('Error al eliminar de favoritos:', error);
          this.isLoading = false;
          if (error.status === 401) {
            toast.error('No tienes permiso para eliminar esta playa de favoritos');
          } else if (error.message?.includes('Network Error')) {
            toast.error('Error de red. Intenta de nuevo más tarde');
          } else {
            toast.error('Error al eliminar la playa de favoritos');
          }
        },
      });
    } else {
      // Añadir a favoritos
      this.favouritesService.addToFavourites(beachId).subscribe({
        next: (response) => {
          console.log('Playa añadida a favoritos:', response.message);
          this.isFavourite = true;
          this.isLoading = false;
          toast.success('Playa añadida a favoritos');
        },
        error: (error: any) => {
          console.error('Error al añadir a favoritos:', error);
          this.isLoading = false;
          if (error.status === 401) {
            toast.error('No tienes permiso para añadir esta playa a favoritos');
          } else if (error.message?.includes('Network Error')) {
            toast.error('Error de red. Intenta de nuevo más tarde');
          } else {
            toast.error('Error al añadir la playa a favoritos');
          }
        },
      });
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner'; // Import toast
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
    private userService: UserService, // Corrected typo (userSerive -> userService)
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.user = await this.userService.getMe();
    } catch (error: any) {
      console.error('Error fetching user:', error);
      // Handle different error cases
      if (error.response?.status === 401) {
        this.error = 'No has iniciado sesión o no estás registrado.';
        toast.error('Por favor, inicia sesión para ver tus favoritos');
      } else if (error.message?.includes('Network Error')) {
        this.error = 'No se pudo conectar al servidor. Verifica tu conexión.';
        toast.error('Error de red. Intenta de nuevo más tarde');
      } else {
        this.error = 'No se pudieron cargar los datos del usuario.';
        toast.error('Error al cargar el usuario');
      }
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
        this.beaches = response.data.map((item: any) => item.beach_grades); // Preserve existing mapping
        console.log('Playas asignadas a this.beaches:', this.beaches);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las playas favoritas:', error);
        this.error = 'No se pudieron cargar tus playas favoritas. Por favor, intenta de nuevo más tarde.';
        toast.error('Error al cargar los favoritos'); // Error toast
        this.loading = false;
      }
    });
  }
}
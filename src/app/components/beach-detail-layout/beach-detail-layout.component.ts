// components/beach-detail-layout/beach-detail-layout.component.ts
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beach } from '../../models/beach';
import { AuthStateService } from '../../services/auth-state.service';
import { FavoritesService } from '../../services/favourites.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Observable, of } from 'rxjs';
import type { User as FirebaseUser } from 'firebase/auth';

@Component({
  selector: 'app-beach-detail-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail-layout.component.html',
  styleUrls: ['./beach-detail-layout.component.css'],
})
export class BeachDetailLayoutComponent implements OnInit {
  @Input() beach!: Beach;
  isFavorite$: Observable<boolean> = of(false);
  user: FirebaseUser | null = null;

  private authStateService = inject(AuthStateService);
  private favoritesService = inject(FavoritesService); // Inyecta el servicio
  private router = inject(Router);

  ngOnInit(): void {
    this.authStateService.user$.subscribe((user) => {
      this.user = user;
      if (user && this.beach?.id) {
        this.isFavorite$ = this.favoritesService.isFavoriteBeach(user.uid, this.beach.id);
      } else {
        this.isFavorite$ = of(false);
      }
    });
  }

  async toggleFavorite(): Promise<void> {
    if (!this.user) {
      toast.error('Debes iniciar sesión para guardar favoritos.');
      this.router.navigate(['/auth/login']);
      return;
    }

    try {
      const isCurrentlyFavorite = await this.favoritesService.isFavoriteBeach(this.user.uid, this.beach.id).toPromise();
      if (isCurrentlyFavorite) {
        await this.favoritesService.removeFavoriteBeach(this.user.uid, this.beach.id);
        toast.success(`${this.beach.name} eliminada de favoritos.`);
      } else {
        await this.favoritesService.addFavoriteBeach(this.user.uid, this.beach.id);
        toast.success(`${this.beach.name} añadida a favoritos.`);
      }
      this.isFavorite$ = of(!isCurrentlyFavorite);
    } catch (error: any) {
      toast.error(`Error al gestionar favoritos: ${error.message}`);
    }
  }
}
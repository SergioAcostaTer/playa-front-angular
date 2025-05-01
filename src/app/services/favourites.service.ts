import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc, getDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest, firstValueFrom, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { BeachService } from './beach.service';
import { Beach } from '../models/beach';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private beachService = inject(BeachService); // Inyección única de BeachService

  async addFavoriteBeach(userId: string, beachId: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `Users/${userId}`);
      await updateDoc(userDocRef, {
        [`favorites.${beachId}`]: true,
      });
    } catch (error: any) {
      throw new Error(`Error al añadir playa a favoritos: ${error.message}`);
    }
  }

  async removeFavoriteBeach(userId: string, beachId: string): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `Users/${userId}`);
      await updateDoc(userDocRef, {
        [`favorites.${beachId}`]: false,
      });
    } catch (error: any) {
      throw new Error(`Error al quitar playa de favoritos: ${error.message}`);
    }
  }

  isFavoriteBeach(userId: string, beachId: string): Observable<boolean> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        const data = docSnap.data();
        return data?.['favorites']?.[beachId] === true;
      }),
      catchError((error) => {
        console.error('Error verificando favorito:', error);
        return of(false);
      })
    );
  }

  getFavoriteBeaches(userId: string): Observable<string[]> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        const data = docSnap.data();
        if (data?.['favorites']) {
          const favoriteIds = Object.keys(data['favorites']).filter(
            (beachId) => data['favorites'][beachId] === true
          );
          console.log(`Favorite beach IDs for user ${userId}:`, favoriteIds); // Log para depuración
          return favoriteIds;
        }
        console.log(`No favorites found for user ${userId}`); // Log para depuración
        return [];
      }),
      catchError((error) => {
        console.error('Error obteniendo favoritos:', error);
        return of([]);
      })
    );
  }

  getFavoriteBeachesDetails(userId: string): Observable<Beach[]> {
    return this.getFavoriteBeaches(userId).pipe(
      switchMap((favoriteBeachIds) => {
        if (favoriteBeachIds.length === 0) {
          return of([]);
        }
        // Crear un array de Observables para cada playa favorita
        const beachObservables = favoriteBeachIds.map((beachId) =>
          this.beachService.getBeachById(beachId).pipe(
            catchError((error) => {
              return of(null);
            })
          )
        );
        // Combinar todos los Observables y filtrar los valores null
        return combineLatest(beachObservables).pipe(
          map((beaches) => beaches.filter((beach): beach is Beach => beach !== null)),
          catchError((error) => {
            console.error('Error combining beach observables:', error);
            return of([]);
          })
        );
      }),
      catchError((error) => {
        console.error('Error obteniendo detalles de playas favoritas:', error);
        return of([]);
      })
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';

// Interfaz para los detalles de un favorito
interface Favourite {
  id: number;
  userId: number;
  beachId: number;
  createdAt: string;
}

// Interfaz para una playa (basada en la respuesta de la API)
interface Beach {
  id: string;
  slug: string;
  coverUrl: string;
  name: string;
  island: string;
  municipality: string;
  province: string;
  accessByCar: boolean;
  accessByFoot: string;
  accessByShip: boolean;
  adaptedShower: boolean;
  annualMaxOccupancy: string;
  assistedBathing: boolean;
  bathingConditions: string;
  classification: string;
  environmentCondition: string;
  blueFlag: boolean;
  hasAdaptedShowers: boolean;
  hasCobbles: boolean;
  hasConcrete: boolean;
  hasFootShowers: boolean;
  hasGravel: boolean;
  hasMixedComposition: boolean;
  hasPebbles: boolean;
  hasRock: boolean;
  hasSand: boolean;
  hasShowers: boolean;
  hasToilets: boolean;
  isBeach: boolean;
  isWindy: boolean;
  isZbm: boolean;
  kidsArea: boolean;
  lastUpdate: string | null;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  lifeguardService: string;
  pmrShade: boolean;
  protectionLevel: string;
  riskLevel: string;
  sandColor: string;
  sportsArea: boolean;
  sunbedRentals: boolean;
  umbrellaRentals: boolean;
  waterSportsRentals: boolean;
  wheelchairAccess: boolean;
}

// Interfaz para un elemento de la lista de favoritos (contiene favoritos y playa)
interface FavouriteBeach {
  favourites: Favourite;
  beaches: Beach;
}

// Interfaz para la respuesta de GET /favourites
interface FavouritesResponse {
  status: number;
  data: FavouriteBeach[];
}

// Interfaz para la respuesta de añadir o eliminar favoritos
interface ActionResponse {
  status: number;
  message: string;
}

// Interfaz para la respuesta de GET /like/{beachId}
interface CheckFavouriteResponse {
  status: number;
  data?: Favourite;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    this.apiUrl = this.envService.getApiUrl();
  }

  // Método para obtener las playas favoritas del usuario
  getFavourites(): Observable<FavouritesResponse> {
    return this.http.get<FavouritesResponse>(`${this.apiUrl}/favourites`, {
      withCredentials: true
    });
  }

  // Método para añadir una playa a favoritos
  addToFavourites(beachId: number): Observable<ActionResponse> {
    return this.http.post<ActionResponse>(
      `${this.apiUrl}/like/${beachId}`,
      {},
      { withCredentials: true }
    );
  }

  // Método para eliminar una playa de favoritos
  removeFromFavourites(beachId: number): Observable<ActionResponse> {
    return this.http.delete<ActionResponse>(
      `${this.apiUrl}/like/${beachId}`,
      { withCredentials: true }
    );
  }

  // Método para verificar si una playa específica está en favoritos
  checkIfFavourite(beachId: number): Observable<boolean> {
    return this.http.get<CheckFavouriteResponse>(`${this.apiUrl}/like/${beachId}`, {
      withCredentials: true
    }).pipe(
      map(response => {
        return response.status === 200 && !!response.data;
      }),
      catchError(error => {
        if (error.status === 404) {
          return [false]; // La playa no está en favoritos
        }
        return throwError(() => error); // Propagar otros errores
      })
    );
  }
}
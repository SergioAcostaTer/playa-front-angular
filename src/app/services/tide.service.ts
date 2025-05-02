import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, BehaviorSubject, of, tap } from 'rxjs';
import { PORTS } from '../constants/ports'; // Importa la constante PORTS

// Interfaz para los datos de marea
export interface TideData {
  timestamp: string; // ISO 8601
  height: number; // Altura en metros
}

// Interfaz para modelar un puerto
interface Port {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Respuesta del endpoint gettide
interface TideResponse {
  mareas: {
    copyright: string;
    id: string;
    puerto: string;
    fecha: string; // YYYY-MM-DD
    ndatos: string;
    lat: string;
    lon: string;
    datos: {
      marea: {
        hora: string; // HH:mm
        altura: string; // Altura en metros (como string)
        tipo: 'pleamar' | 'bajamar';
      }[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TideService implements OnDestroy {
  private apiUrl = 'https://ideihm.covam.es/api-ihm/getmarea';
  private portsSubject = new BehaviorSubject<Port[]>([]);
  private portsLoaded = false;

  constructor(private http: HttpClient) {
    this.loadPorts();
  }

  ngOnDestroy(): void {
    this.portsSubject.complete();
  }

  /**
   * Carga la lista de puertos desde la constante PORTS
   */
  private loadPorts(): void {
    const ports = PORTS.map(puerto => ({
      id: puerto.id,
      name: puerto.puerto,
      latitude: puerto.lat,
      longitude: puerto.lon
    }));

    // console.log('Puertos procesados:', ports); // Depuración
    this.portsSubject.next(ports);
    this.portsLoaded = true;
  }

  /**
   * Obtiene los datos de marea para la playa más cercana según sus coordenadas
   * @param latitude Latitud de la playa
   * @param longitude Longitud de la playa
   * @param date Fecha para la que se desean los datos (formato YYYY-MM-DD)
   */
  getTideData(latitude: number, longitude: number, date: string): Observable<TideData[]> {
    if (!this.portsLoaded) {
      return new Observable(observer => {
        const subscription = this.portsSubject.subscribe(ports => {
          console.log('Puertos en getTideData:', ports); // Depuración
          if (ports.length) {
            this.fetchTideData(latitude, longitude, date).subscribe({
              next: data => observer.next(data),
              error: err => observer.error(err),
              complete: () => observer.complete()
            });
          } else {
            observer.error(new Error('No se pudieron cargar los puertos'));
          }
        });
        return () => subscription.unsubscribe();
      });
    }

    return this.fetchTideData(latitude, longitude, date);
  }

  /**
   * Lógica interna para obtener datos de marea
   */
  private fetchTideData(latitude: number, longitude: number, date: string): Observable<TideData[]> {
    const ports = this.portsSubject.getValue();
    console.log('Puertos disponibles:', ports); // Depuración
    const nearestPort = this.findNearestPort(latitude, longitude, ports);

    if (!nearestPort) {
      console.warn('No se encontró un puerto cercano para las coordenadas:', latitude, longitude);
      return of([]);
    }

    // Convertir fecha YYYY-MM-DD a YYYYMMDD
    const formattedDate = date.replace(/-/g, ''); // Ejemplo: 2025-04-28 -> 20250428
    const url = `${this.apiUrl}?request=gettide&format=json&id=${nearestPort.id}&date=${formattedDate}`;

    return this.http.get<TideResponse>(url).pipe(
      tap(response => {
        console.log('Respuesta de gettide:', response); // Depuración
      }),
      map(response => {
        const mareas = response.mareas?.datos?.marea || [];
        if (!mareas.length) {
          console.warn('No se encontraron datos de mareas para el puerto:', nearestPort.name);
          throw new Error('No se encontraron datos de mareas');
        }

        // Mapear los datos al formato TideData con validación
        const tideData: TideData[] = mareas
          .map(marea => {
            const timestampDate = new Date(`${response.mareas.fecha}T${marea.hora}:00Z`);
            if (isNaN(timestampDate.getTime())) {
              console.warn(`Timestamp inválido para ${response.mareas.fecha} ${marea.hora}`);
              return null;
            }
            const height = parseFloat(marea.altura);
            if (isNaN(height)) {
              console.warn(`Altura inválida para ${response.mareas.fecha} ${marea.hora}`);
              return null;
            }
            return {
              timestamp: timestampDate.toISOString(),
              height
            };
          })
          .filter((item): item is TideData => item !== null);

        return tideData.sort((a: TideData, b: TideData) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
      }),
      catchError(error => {
        console.error('Error al obtener datos de mareas:', error);
        return of([]);
      }),
      tap(() => {
        console.log('Datos de mareas obtenidos para el puerto:', nearestPort.name);
      })
    );
  }

  /**
   * Encuentra el puerto más cercano a las coordenadas dadas
   * @param latitude Latitud de la playa
   * @param longitude Longitud de la playa
   * @param ports Lista de puertos
   * @returns Puerto más cercano o null si no hay puertos
   */
  private findNearestPort(latitude: number, longitude: number, ports: Port[]): Port | null {
    if (!ports.length) {
      console.warn('No hay puertos disponibles para buscar el más cercano');
      return null;
    }

    const nearest = ports.reduce(
      (acc, port) => {
        const distance = this.calculateDistance(latitude, longitude, port.latitude, port.longitude);
        if (distance < acc.distance) {
          return { port, distance };
        }
        return acc;
      },
      { port: null as Port | null, distance: Infinity }
    );

    return nearest.port;
  }

  /**
   * Calcula la distancia euclidiana entre dos puntos (simplificado, no haversine)
   * @param lat1 Latitud del primer punto
   * @param lon1 Longitud del primer punto
   * @param lat2 Latitud del segundo punto
   * @param lon2 Longitud del segundo punto
   * @returns Distancia en grados (aproximada)
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;
    return Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
  }
}

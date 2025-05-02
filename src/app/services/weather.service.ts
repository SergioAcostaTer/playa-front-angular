import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DailyWeather } from '../models/weather';

interface WeatherData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getWeatherData(latitude: number, longitude: number): Observable<DailyWeather[]> {
    if (!this.isBrowser) {
      // En SSR, devolver un array vacío para evitar errores
      return of([]);
    }

    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;
    return from(
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((data: WeatherData) =>
          data?.daily?.time.map((date, index) => ({
            date,
            tempMax: data.daily.temperature_2m_max[index],
            tempMin: data.daily.temperature_2m_min[index],
            precipitation: data.daily.precipitation_sum[index],
            weathercode: data.daily.weathercode[index]
          })) || []
        )
        .catch(error => {
          console.error('Error fetching weather data:', error);
          return [];
        })
    ).pipe(
      catchError(() => of([]))
    );
  }
}

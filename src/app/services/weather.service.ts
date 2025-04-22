import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData, DailyWeather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherData(latitude: number, longitude: number): Observable<DailyWeather[]> {
    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;
    return this.http.get<WeatherData>(url).pipe(
      map(data => {
        if (!data || !data.daily) {
          return [];
        }
        return data.daily.time.map((date, index) => ({
          date,
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
          precipitation: data.daily.precipitation_sum[index],
          weathercode: data.daily.weathercode[index]
        }));
      }),
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return of([]);
      })
    );
  }
}
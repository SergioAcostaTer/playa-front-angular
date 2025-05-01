import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherData, DailyWeather, HourlyWeather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getDailyWeatherData(latitude: number, longitude: number): Observable<DailyWeather[]> {
    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,sunrise,sunset&hourly=relative_humidity_2m,pressure_msl&timezone=auto`;
    return this.http.get<WeatherData>(url).pipe(
      map(data => {
        if (!data || !data.daily || !data.hourly) {
          return [];
        }

        const dailyHumidity: { [date: string]: number[] } = {};
        const dailyPressure: { [date: string]: number[] } = {};
        data.hourly.time.forEach((time, index) => {
          const date = time.split('T')[0];
          if (!dailyHumidity[date]) dailyHumidity[date] = [];
          if (!dailyPressure[date]) dailyPressure[date] = [];
          dailyHumidity[date].push(data.hourly.relative_humidity_2m[index]);
          dailyPressure[date].push(data.hourly.pressure_msl[index]);
        });

        const avgDailyHumidity = Object.keys(dailyHumidity).reduce((acc, date) => {
          const humidities = dailyHumidity[date];
          acc[date] = humidities.reduce((sum, val) => sum + val, 0) / humidities.length;
          return acc;
        }, {} as { [date: string]: number });

        const avgDailyPressure = Object.keys(dailyPressure).reduce((acc, date) => {
          const pressures = dailyPressure[date];
          acc[date] = pressures.reduce((sum, val) => sum + val, 0) / pressures.length;
          return acc;
        }, {} as { [date: string]: number });

        return data.daily.time.map((date, index) => ({
          date,
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
          precipitation: data.daily.precipitation_sum[index],
          weathercode: data.daily.weathercode[index],
          windSpeedMax: data.daily.wind_speed_10m_max[index],
          windDirectionDominant: data.daily.wind_direction_10m_dominant[index],
          uvIndexMax: data.daily.uv_index_max[index],
          sunrise: data.daily.sunrise[index],
          sunset: data.daily.sunset[index],
          avgHumidity: avgDailyHumidity[date],
          avgPressure: avgDailyPressure[date]
        }));
      }),
      catchError(error => {
        console.error('Error fetching daily weather data:', error);
        return of([]);
      })
    );
  }

  getHourlyWeatherData(latitude: number, longitude: number, date: string): Observable<HourlyWeather[]> {
    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=relative_humidity_2m,pressure_msl&timezone=auto&start_date=${date}&end_date=${date}`;
    return this.http.get<WeatherData>(url).pipe(
      map(data => {
        if (!data || !data.hourly) {
          return [];
        }
        return data.hourly.time.map((time, index) => ({
          time,
          humidity: data.hourly.relative_humidity_2m[index],
          pressure: data.hourly.pressure_msl[index]
        }));
      }),
      catchError(error => {
        console.error('Error fetching hourly weather data:', error);
        return of([]);
      })
    );
  }
}
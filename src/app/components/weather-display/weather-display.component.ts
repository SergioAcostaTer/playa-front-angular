import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DailyWeather } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
})
export class WeatherDisplayComponent implements OnChanges {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  weatherDays: DailyWeather[] = [];
  selectedDayIndex: number = -1;
  currentTime: string = '';
  currentDate: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['latitude'] &&
        changes['latitude'].currentValue !==
          changes['latitude'].previousValue) ||
      (changes['longitude'] &&
        changes['longitude'].currentValue !==
          changes['longitude'].previousValue)
    ) {
      this.fetchWeatherData();
    }
  }

  private fetchWeatherData(): void {
    if (
      !this.latitude ||
      !this.longitude ||
      isNaN(this.latitude) ||
      isNaN(this.longitude)
    ) {
      this.weatherDays = [];
      this.selectedDayIndex = -1;
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.weatherService
      .getWeatherData(this.latitude, this.longitude)
      .subscribe({
        next: (data) => {
          this.weatherDays = data;
          this.selectedDayIndex = data.length > 0 ? 0 : -1;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading weather data:', err);
          this.weatherDays = [];
          this.selectedDayIndex = -1;
          this.isLoading = false;
        },
      });
  }

  selectDay(index: number): void {
    if (index >= 0 && index < this.weatherDays.length) {
      this.selectedDayIndex = index;
    }
  }

  getWeatherIcon(weathercode: number): string {
    // Mapeo simplificado de códigos de Open-Meteo a iconos
    const weatherIcons: { [key: number]: string } = {
      0: '☀️', // Clear sky
      1: '🌤️', // Mainly clear
      2: '⛅', // Partly cloudy
      3: '☁️', // Overcast
      45: '🌫️', // Fog
      51: '🌧️', // Light drizzle
      61: '🌧️', // Light rain
      63: '🌧️', // Moderate rain
      65: '🌧️', // Heavy rain
      71: '❄️', // Light snow
      73: '❄️', // Moderate snow
      75: '❄️', // Heavy snow
      95: '⛈️', // Thunderstorm
    };
    return weatherIcons[weathercode] || '🌍';
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString();
  }
}

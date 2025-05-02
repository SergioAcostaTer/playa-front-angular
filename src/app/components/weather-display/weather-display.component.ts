import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { DailyWeather } from '../../models/weather';

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
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    }
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

  selectDay(index: number): void {
    if (index >= 0 && index < this.weatherDays.length) {
      this.selectedDayIndex = index;
    }
  }

  getWeatherIcon(weathercode: number): string {
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

  private fetchWeatherData = (): void => {
    if (!this.isBrowser) return;

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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const weatherData =
          data?.daily?.time.map((date: string, index: number) => ({
            date,
            tempMax: data.daily.temperature_2m_max[index],
            tempMin: data.daily.temperature_2m_min[index],
            precipitation: data.daily.precipitation_sum[index],
            weathercode: data.daily.weathercode[index],
          })) || [];

        this.weatherDays = weatherData;
        this.selectedDayIndex = weatherData.length > 0 ? 0 : -1;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        this.weatherDays = [];
        this.selectedDayIndex = -1;
        this.isLoading = false;
      });
  };
}

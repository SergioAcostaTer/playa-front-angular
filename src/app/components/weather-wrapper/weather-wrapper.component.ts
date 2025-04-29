import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DailyWeather } from '../../models/weather';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-wrapper',
  templateUrl: './weather-wrapper.component.html',
  styleUrls: ['./weather-wrapper.component.css'],
  imports: [WeatherCardComponent, CommonModule],
})
export class WeatherWrapperComponent implements OnChanges {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  weatherDays: DailyWeather[] = [];
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['latitude'] || changes['longitude']) {
      this.fetchWeatherData();
    }
  }

  private fetchWeatherData() {
    if (!this.latitude || !this.longitude) {
      this.weatherDays = [];
      return;
    }
    this.isLoading = true;
    this.weatherService.getWeatherData(this.latitude, this.longitude).subscribe({
      next: (data) => {
        this.weatherDays = data;
        this.isLoading = false;
      },
      error: () => {
        this.weatherDays = [];
        this.isLoading = false;
      }
    });
  }
}
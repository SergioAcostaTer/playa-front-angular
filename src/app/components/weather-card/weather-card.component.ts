import { Component, Input } from '@angular/core';
import { DailyWeather } from '../../models/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  imports: [CommonModule],
})

export class WeatherCardComponent {
  @Input() dailyWeather!: DailyWeather;

  getWeatherClass(): string {
    const weathercode = this.dailyWeather.weathercode;
  
    // Soleado: Cielo despejado o mayormente despejado
    if ([0, 1].includes(weathercode)) {
      return 'sun';
    }
    // Nublado: Parcialmente nublado, nublado, niebla
    else if ([2, 3, 45, 48].includes(weathercode)) {
      return 'cloud';
    }
    // Lluvioso: Llovizna, lluvia, chubascos, tormentas
    else if ([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weathercode)) {
      return 'rain';
    }
    // Valor por defecto para códigos desconocidos
    return 'cloud';
  }
}
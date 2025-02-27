import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';
import { beachesList } from '../../constants/beachesList.js';

@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, BeachCardComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingPageComponent {
  beaches = beachesList;

  categories: string[] = [
    'Playas',
    'Montañas',
    'Ciudades',
    'Bosques',
    'Desiertos',
    'Lagos',
    'Ríos',
    'Cascadas',
    'Pueblos',
    'Parques',
    'Monumentos',
    'Museos',
    'Iglesias',
    'Castillos',
    'Mercados',
    'Fiestas',
    'Eventos',
    'Deportes',
    'Aventura',
    'Gastronomía',
    'Vinos',
    'Cervezas',
    'Cafés',
    'Restaurantes',
    'Bares',
    'Discotecas',
    'Tiendas',
    'Mercadillos',
    'Artesanía',
    'Moda',
    'Joyas',
    'Música',
    'Teatro',
    'Cine',
    'Festivales',
    'Conciertos',
    'Exposiciones',
    'Ferias',
    'Carnavales',
    'Fiestas',
    'Eventos',
    'Deportes',
    'Aventura',
    'Gastronomía',
    'Vinos',
    'Cervezas',
    'Cafés',
    'Restaurantes',
    'Bares',
    'Discotecas',
    'Tiendas',
    'Mercadillos',
    'Artesanía',
    'Moda',
    'Joyas',
    'Música',
    'Teatro',
    'Cine',
  ];
  categoryImage: string =
    'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg';
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';

@Component({
  selector: 'Favoritos',
  standalone: true,
  imports: [CommonModule, BeachCardComponent],
  templateUrl: './Favourite.component.html',
  styleUrls: ['./Favourite.component.css'],
})
export class FavouritePageComponent {
  beaches = [
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Playa_del_Verodal%2C_El_Hierro%2C_Canarias%2C_Espa%C3%B1a.JPG/220px-Playa_del_Verodal%2C_El_Hierro%2C_Canarias%2C_Espa%C3%B1a.JPG',
      title: 'Playa del Verodal',
      rating: '4.5',
      distance: 'A 10 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Tacor%C3%B3n_foto_principal.jpg/220px-Tacor%C3%B3n_foto_principal.jpg',
      title: 'Playa de Tacorón',
      rating: '4.2',
      distance: 'A 15 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/San_Sebastian_EM1B5794_%2832684958331%29.jpg/220px-San_Sebastian_EM1B5794_%2832684958331%29.jpg',
      title: 'Playa de San Sebastián',
      rating: '4.7',
      distance: 'A 20 km',
      recomended: true

    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Playa_de_Santiago_%288524842683%29.jpg/220px-Playa_de_Santiago_%288524842683%29.jpg',
      title: 'Playa de Santiago',
      rating: '4.3',
      distance: 'A 25 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/View_of_the_steep_coast_at_Playa_De_Vueltas_black_sand_beach_on_La_Gomera%2C_Spain_%2848293845792%29.jpg/220px-View_of_the_steep_coast_at_Playa_De_Vueltas_black_sand_beach_on_La_Gomera%2C_Spain_%2848293845792%29.jpg',
      title: 'Playa de Vueltas',
      rating: '4.6',
      distance: 'A 30 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Santa_Cruz_de_La_Palma_2017-10_01.jpg/220px-Santa_Cruz_de_La_Palma_2017-10_01.jpg',
      title: 'Playa de Santa Cruz de La Palma',
      rating: '4.5',
      distance: 'A 35 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/La_Palma_-_Brena_Baja_-_Los_Cancajos_-_Punta_de_la_Arena_%2B_Playa_de_Los_Cancajos_06_ies.jpg/220px-La_Palma_-_Brena_Baja_-_Los_Cancajos_-_Punta_de_la_Arena_%2B_Playa_de_Los_Cancajos_06_ies.jpg',
      title: 'Playa de Los Cancajos',
      rating: '4.8',
      distance: 'A 40 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/El_Faro_11_ies.jpg/220px-El_Faro_11_ies.jpg',
      title: 'Playa El Faro',
      rating: '4.2',
      distance: 'A 45 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Playa_Charco_Verde_near_Puerto_Naos_%28Canary_Islands_2015%2C_La_Plama%29_-_panoramio.jpg/220px-Playa_Charco_Verde_near_Puerto_Naos_%28Canary_Islands_2015%2C_La_Plama%29_-_panoramio.jpg',
      title: 'Playa Charco Verde',
      rating: '4.9',
      distance: 'A 50 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/La_Palma_-_Tazacorte_-_El_Puerto_-_Avenida_El_Emigrante_%2B_Playa_08_ies.jpg/220px-La_Palma_-_Tazacorte_-_El_Puerto_-_Avenida_El_Emigrante_%2B_Playa_08_ies.jpg',
      title: 'Playa de Tazacorte',
      rating: '4.3',
      distance: 'A 55 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Puntallana_-_Playa_de_Nogales_01_ies.jpg/220px-Puntallana_-_Playa_de_Nogales_01_ies.jpg',
      title: 'Playa de Nogales',
      rating: '4.6',
      distance: 'A 60 km',
      recomended: true
    },
    {
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/PuntaDeTeno.jpg/220px-PuntaDeTeno.jpg',
      title: 'Playa de Punta de Teno',
      rating: '4.7',
      distance: 'A 65 km',
      recomended: true
    }
  ];
}

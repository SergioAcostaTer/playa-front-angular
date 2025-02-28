import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RankingCardComponent } from '../ranking-card/ranking-card.component';

interface Beach {
  title: string;
  imageUrl: string;
  rating: number;
  distance: string;
  description: string;
  recommended: boolean;
}

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.css'],
  imports: [CommonModule, RankingCardComponent],
})
export class RankingListComponent {
  beaches: Beach[] = [
    {
      title: 'Playa del Verodal',
      imageUrl:
        'https://lagavetavoladora.com/wp-content/uploads/2022/04/Playa-El-Verodal.jpg',
      rating: 4.5,
      distance: '10 km',
      description:
        'Famosa por su arena rojiza y su ambiente salvaje. Un paraíso escondido en El Hierro, ideal para relajarse y disfrutar del mar.',
      recommended: true,
    },
    {
      title: 'Playa de Tacorón',
      imageUrl:
        'https://elhierro.travel/sites/default/files/2018-04/Cala-Tacoron-El-Hierro.png',
      rating: 4.2,
      distance: '15 km',
      description:
        'Una joya volcánica con aguas cristalinas. Perfecta para snorkel y disfrutar de una vista impresionante de los acantilados.',
      recommended: false,
    },
    {
      title: 'Playa de San Sebastián',
      imageUrl:
        'https://www.visitarcanarias.com/Images/Playa-de-San-Sebastian.jpg',
      rating: 4.7,
      distance: '20 km',
      description:
        'Playa urbana con historia, rodeada de edificios coloniales y una brisa marina que enamora. Perfecta para paseos al atardecer.',
      recommended: true,
    },
    {
      title: 'Playa de Santiago',
      imageUrl:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/53/80/5c/ein-blick-uber-die-bucht.jpg?w=1200&h=-1&s=1',
      rating: 4.3,
      distance: '25 km',
      description:
        'Ubicada en un encantador pueblo pesquero, esta playa combina tranquilidad con la cultura local y restaurantes de mariscos frescos.',
      recommended: false,
    },
    {
      title: 'Playa de Vueltas',
      imageUrl: 'https://www.visitarcanarias.com/Images/Playa-Vueltas.jpg',
      rating: 4.6,
      distance: '30 km',
      description:
        'Playa de arena negra con un ambiente relajado. Ideal para nadar, tomar el sol y desconectar del mundo.',
      recommended: false,
    },
  ];
}

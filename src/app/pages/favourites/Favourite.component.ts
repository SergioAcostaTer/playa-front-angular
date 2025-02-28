import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';
import { beachesList } from '../../constants/beachesList';
import { TitlePageComponent } from '../../title-page/title-page.component';

@Component({
  selector: 'app-user-favourites',
  standalone: true,
  imports: [CommonModule, BeachCardComponent, TitlePageComponent],
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouritePageComponent {
  beaches = beachesList;
}

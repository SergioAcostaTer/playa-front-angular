import { Component } from '@angular/core';
import { BeachCardComponent } from '../../components/beach-card/beach-card.component';

@Component({
  selector: 'Home',
  imports: [BeachCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

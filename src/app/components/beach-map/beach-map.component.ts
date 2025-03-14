import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beach-map',
  imports: [ CommonModule ],
  templateUrl: './beach-map.component.html',
  styleUrl: './beach-map.component.css'
})
export class BeachMapComponent {
  @Input() mapImageUrl: string = '/images/example-map.png';
}

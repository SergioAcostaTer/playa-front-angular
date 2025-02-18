import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beach-card',
  imports: [CommonModule],
  templateUrl: './beach-card.component.html',
  styleUrls: ['./beach-card.component.css']
})
export class BeachCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() rating: string = '';
  @Input() distance: string = '';
  @Input() recommended: boolean = false;
}

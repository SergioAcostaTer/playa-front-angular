import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BeachDescription } from '../../models/beach';

@Component({
  selector: 'app-beach-description',
  imports: [ CommonModule ],
  templateUrl: './beach-description.component.html',
  styleUrl: './beach-description.component.css'
})
export class BeachDescriptionComponent {
  @Input() title!: string;
  @Input() description!: BeachDescription;
}

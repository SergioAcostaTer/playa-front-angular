import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Beach } from '../../models/beach';

@Component({
  selector: 'app-beach-detail-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail-layout.component.html',
  styleUrls: ['./beach-detail-layout.component.css'],
})
export class BeachDetailLayoutComponent {
  @Input() beach!: Beach;
}
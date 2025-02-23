import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'noheader-layout',
  standalone: true,
  templateUrl: './noheader-layout.component.html',
  imports: [CommonModule, RouterModule],
})
export class NoHeaderLayoutComponent {
}

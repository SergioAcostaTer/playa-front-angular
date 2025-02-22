import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-header]',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
  host: { 'id': 'header' }
})
export class HeaderComponent {}
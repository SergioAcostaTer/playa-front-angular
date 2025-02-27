import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {}

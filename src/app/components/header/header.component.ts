import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { UserHeaderComponent } from "../user-header/user-header.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  imports: [CommonModule, LogoComponent, UserHeaderComponent, UserHeaderComponent]
})
export class HeaderComponent {
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from "../user-header/user-header.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  imports: [CommonModule, UserHeaderComponent, UserHeaderComponent]
})
export class HeaderComponent {
}

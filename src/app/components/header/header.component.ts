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
  isPopupVisible: boolean = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isPopupVisible) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.header__popup') && !target.closest('.header__menu-toggle')) {
      this.closePopup();
    }
  }
}

// user-header.component.ts
import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { AuthService } from '../../../services/auth.service'; // Ajusta la ruta según tu estructura
import { toast } from 'ngx-sonner';
import { onAuthStateChanged } from '@angular/fire/auth'; // Importamos onAuthStateChanged

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent {
  isRegistered: boolean = false;
  isPopupVisible: boolean = false;
  // private _authService = inject(AuthService); // Cambiamos el nombre para evitar confusión
  private _router = inject(Router);

  constructor() {
    // Escuchamos los cambios en el estado de autenticación con onAuthStateChanged
    /* onAuthStateChanged(this._authService['_auth'], (user) => {
      this.isRegistered = !!user; // Actualizamos isRegistered según el estado de autenticación
    }); */
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  /* async logout(): Promise<void> {
    try {
      // Llamamos al método logout del servicio AuthService para cerrar la sesión en Firebase
      await this._authService.logout();
      this.closePopup();
      toast.success('Sesión cerrada correctamente.');
      this._router.navigate(['/auth/login']);
    } catch (error) {
      toast.error('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  } */

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isPopupVisible) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.popup__container') && !target.closest('.user-header__menu-toggle')) {
      this.closePopup();
    }
  }
}
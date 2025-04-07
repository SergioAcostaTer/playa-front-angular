import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { toast } from 'ngx-sonner';
import { onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

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
  userPhoto: string = '/images/avatar.jpg';
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _firestore = inject(Firestore);

  constructor() {
    onAuthStateChanged(this._authService['_auth'], (user) => {
      this.isRegistered = !!user;
      if (user) {
        this.loadUserData(user);
      } else {
        this.userPhoto = '/images/avatar.jpg';
      }
    });
  }

  async loadUserData(user: FirebaseUser): Promise<void> {
    try {
      const userRef = doc(this._firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.userPhoto = userData['imageUrl'] || '/images/avatar.jpg';
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.userPhoto = '/images/avatar.jpg';
    }
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  async logout(): Promise<void> {
    try {
      await this._authService.logout();
      this.closePopup();
      toast.success('Sesión cerrada correctamente.');
      this._router.navigate(['/auth/login']);
    } catch (error) {
      toast.error('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
      console.error('Logout error:', error);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isPopupVisible) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.popup__container') && !target.closest('.user-header__menu-toggle')) {
      this.closePopup();
    }
  }
}
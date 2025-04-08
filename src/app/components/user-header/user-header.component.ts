import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { toast } from 'ngx-sonner';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import type { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  isRegistered: boolean = false;
  isPopupVisible: boolean = false;
  userPhoto: string = '/images/avatar.jpg';

  private _authStateService = inject(AuthStateService);
  private _router = inject(Router);
  private _firestore = inject(Firestore);
  private _auth = inject(AuthService);

  ngOnInit(): void {
    this.isRegistered = this._authStateService.isAuthenticated(); 
    this.loadUserPhotoFromLocalStorage();

    this._authStateService.user$.subscribe((user) => {
      this.isRegistered = !!user;
      if (user) {
        this.loadUserData(user);
      } else {
        this.userPhoto = '/images/avatar.jpg';
        localStorage.removeItem('userPhoto');
      }
    });
  }

  async loadUserData(user: FirebaseUser): Promise<void> {
    try {
      const cachedPhoto = localStorage.getItem('userPhoto');
      if (cachedPhoto) {
        this.userPhoto = cachedPhoto;
        return;
      }

      const userRef = doc(this._firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.userPhoto = userData['imageUrl'] || '/images/avatar.jpg';
        localStorage.setItem('userPhoto', this.userPhoto);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.userPhoto = '/images/avatar.jpg';
    }
  }

  private loadUserPhotoFromLocalStorage(): void {
    const cachedPhoto = localStorage.getItem('userPhoto');
    if (cachedPhoto && this.isRegistered) {
      this.userPhoto = cachedPhoto;
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
      await this._auth.logout();
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
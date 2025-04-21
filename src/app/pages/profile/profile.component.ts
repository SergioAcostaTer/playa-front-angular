import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import type { User as FirebaseUser } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userData: any = { firstName: '', lastName: '', email: '' };
  userPhoto: string = '/images/avatar.jpg';
  isImagePopupVisible: boolean = false;
  newImageUrl: string = '';

  private _authStateService = inject(AuthStateService);
  private _authService = inject(AuthService);
  private _firestore = inject(Firestore);
  private _platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this._authStateService.user$.subscribe((user) => {
      if (user) {
        this.loadUserData(user);
      }
    });
  }

  async loadUserData(user: FirebaseUser): Promise<void> {
    try {
      if (isPlatformBrowser(this._platformId)) {
        const cachedPhoto = localStorage.getItem('userPhoto');
        if (cachedPhoto) {
          this.userPhoto = cachedPhoto;
        }
      }

      const userRef = doc(this._firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        this.userData = userDoc.data();
        this.userPhoto = this.userData.imageUrl || '/images/avatar.jpg';
        if (isPlatformBrowser(this._platformId)) {
          localStorage.setItem('userPhoto', this.userPhoto);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Error al cargar los datos del usuario.');
    }
  }

  toggleImagePopup(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.isImagePopupVisible = !this.isImagePopupVisible;
    if (!this.isImagePopupVisible) {
      this.newImageUrl = ''; // Limpiar la URL al cerrar el popup
    }
  }

  async updateImageUrl(): Promise<void> {
    if (!this.newImageUrl || !this._authStateService.currentUser) {
      toast.error('Por favor, ingresa una URL válida o asegúrate de estar autenticado.');
      return;
    }

    // Validar que la URL sea válida (básica validación)
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;
    if (!urlPattern.test(this.newImageUrl)) {
      toast.error('La URL debe ser una imagen válida (png, jpg, jpeg, gif, webp).');
      return;
    }

    try {
      // Actualizar Firestore
      await this._authService.updateUserData(this._authStateService.currentUser.uid, {
        imageUrl: this.newImageUrl,
      });

      // Actualizar UI
      this.userPhoto = this.newImageUrl;
      this.userData.imageUrl = this.newImageUrl;
      if (isPlatformBrowser(this._platformId)) {
        localStorage.setItem('userPhoto', this.newImageUrl);
      }

      toast.success('Foto de perfil actualizada correctamente.');
      this.toggleImagePopup();
    } catch (error) {
      console.error('Error updating image URL:', error);
      toast.error('Error al actualizar la imagen.');
    }
  }

  async saveChanges(): Promise<void> {
    if (!this._authStateService.currentUser) {
      toast.error('No estás autenticado.');
      return;
    }

    try {
      await this._authService.updateUserData(this._authStateService.currentUser.uid, {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
      });
      toast.success('Datos actualizados correctamente.');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Error al guardar los cambios.');
    }
  }
}
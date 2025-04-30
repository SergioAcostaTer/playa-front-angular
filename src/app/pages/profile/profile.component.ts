import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { toast } from 'ngx-sonner';
import type { User as FirebaseUser } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userData: Partial<User> = { email: '', firstName: '', lastName: '', imageUrl: '' };
  formData: Partial<User> = { email: '', firstName: '', lastName: '' }; // Copia para el formulario
  userPhoto: string = '/images/avatar.jpg';
  isImagePopupVisible: boolean = false;
  newImageUrl: string = '';

  private _authStateService = inject(AuthStateService);
  private _authService = inject(AuthService);
  private _platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this._authStateService.user$.subscribe((user) => {
      if (user) {
        this.loadUserData(user);
      }
    });
  }

  private loadUserData(user: FirebaseUser): void {
    if (isPlatformBrowser(this._platformId)) {
      const cachedPhoto = localStorage.getItem('userPhoto');
      if (cachedPhoto) {
        this.userPhoto = cachedPhoto;
      }
    }

    this._authService.getUserById(user.uid).subscribe({
      next: (userData: User | null) => {
        if (userData) {
          this.userData = { ...userData }; // Datos reales para la vista
          this.formData = { ...userData }; // Copia para el formulario
          this.userPhoto = userData.imageUrl || '/images/avatar.jpg';
          if (isPlatformBrowser(this._platformId)) {
            localStorage.setItem('userPhoto', this.userPhoto);
          }
        }
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        toast.error('Error al cargar los datos del usuario.');
      },
    });
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
    const user = this._authStateService.currentUser;
    if (!this.newImageUrl || !user) {
      toast.error('Por favor, ingresa una URL válida o asegúrate de estar autenticado.');
      return;
    }

    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!urlPattern.test(this.newImageUrl)) {
      toast.error('La URL debe ser una imagen válida (png, jpg, jpeg, gif, webp).');
      return;
    }

    try {
      await this._authService.updateUser({ id: user.uid, imageUrl: this.newImageUrl });
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
    const user = this._authStateService.currentUser;
    if (!user) {
      toast.error('No estás autenticado.');
      return;
    }

    try {
      // Actualizar Firestore con los datos del formulario
      await this._authService.updateUser({
        id: user.uid,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
      });
      // Actualizar userData con los valores del formulario
      this.userData = {
        ...this.userData,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
      };
      toast.success('Datos actualizados correctamente.');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Error al guardar los cambios.');
    }
  }
}
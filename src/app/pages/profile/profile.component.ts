import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  editedUser: User | null = null;
  loading = true;
  error: string | null = null;
  editMode = false;
  showDeleteVerification = false;
  showDeleteConfirmation = false;
  verificationUsername: string = '';
  usernameError: boolean = false;
  deleteConfirmed: boolean = false;
  userService = inject(UserService);
  router = inject(Router);

  async ngOnInit() {
    try {
      const response = await this.userService.getMe();
      this.user = { ...response };
    } catch (error: any) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        this.error = 'No has iniciado sesión o no estás registrado.';
        toast.error('Por favor, inicia sesión para ver tu perfil');
      } else if (error.message?.includes('Network Error')) {
        this.error = 'No se pudo conectar al servidor. Verifica tu conexión.';
        toast.error('Error de red. Intenta de nuevo más tarde');
      } else {
        this.error = 'No se pudieron cargar los datos del usuario.';
        toast.error('Error al cargar el perfil');
      }
    } finally {
      this.loading = false;
    }
  }

  enableEdit() {
    if (this.user) {
      this.editedUser = { ...this.user };
      this.editMode = true;
      toast.info('Modo de edición activado');
    }
  }

  cancelEdit() {
    this.editedUser = null;
    this.editMode = false;
    toast.info('Cambios descartados');
  }

  async saveChanges() {
    if (!this.user || !this.editedUser) return;

    try {
      this.user = { ...this.editedUser };
      await this.userService.updateUser(this.user);
      console.log('User updated successfully:', this.user);
      toast.success('Perfil actualizado correctamente');
      this.editMode = false;
      this.editedUser = null;
    } catch (error) {
      console.error('Error updating user:', error);
      this.error = 'No se pudieron guardar los cambios.';
      toast.error('Error al actualizar el perfil');
    }
  }

  openDeleteVerification() {
    this.showDeleteVerification = true;
    this.verificationUsername = '';
    this.usernameError = false;
  }

  closeDeleteVerification() {
    this.showDeleteVerification = false;
    this.verificationUsername = '';
    this.usernameError = false;
  }

  validateUsername() {
    this.usernameError = !this.verificationUsername || this.verificationUsername !== this.user?.username;
  }

  proceedToDeleteConfirmation() {
    if (!this.usernameError && this.verificationUsername === this.user?.username) {
      this.showDeleteVerification = false;
      this.showDeleteConfirmation = true;
      this.deleteConfirmed = false;
    }
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
    this.deleteConfirmed = false;
  }

  async deleteAccount() {
    if (!this.deleteConfirmed || !this.user) return;

    try {
      await this.userService.deleteMe();
      toast.success('Cuenta borrada exitosamente');
      this.closeDeleteConfirmation();
      console.log('Navigating to /login');
      const navigationSuccess = await this.router.navigate(['/login']);
      if (!navigationSuccess) {
        console.error('Navigation to /login failed');
        toast.error('No se pudo redirigir a la página de inicio de sesión');
      }
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error('Error al borrar la cuenta');
      this.error = 'No se pudo borrar la cuenta. Intenta de nuevo.';
    }
  }
}
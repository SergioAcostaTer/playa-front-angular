import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner'; // Import toast
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // No ToasterComponent
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  editedUser: User | null = null;
  loading = true;
  error: string | null = null;
  editMode = false;
  userService = inject(UserService);

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
}
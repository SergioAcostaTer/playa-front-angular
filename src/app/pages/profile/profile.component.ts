import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { getMe } from '../../services/getMe';
import { UserService } from '../../services/user.service';

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
  userService = inject(UserService);

  async ngOnInit() {
    try {
      const response = await getMe();
      this.user = {
        ...response
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      this.error = 'No se pudieron cargar los datos del usuario.';
    } finally {
      this.loading = false;
    }
  }

  enableEdit() {
    if (this.user) {
      this.editedUser = { ...this.user };
      this.editMode = true;
    }
  }

  cancelEdit() {
    this.editedUser = null;
    this.editMode = false;
  }

  async saveChanges() {
    if (!this.user || !this.editedUser) return;

    try {
      this.user = { ...this.editedUser };
      await this.userService.updateUser(this.user);
      console.log('User updated successfully:', this.user);
      this.editMode = false;
      this.editedUser = null;
    } catch (error) {
      console.error('Error updating user:', error);
      this.error = 'No se pudieron guardar los cambios.';
    }
  }
}
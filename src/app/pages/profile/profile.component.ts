// src/app/pages/profile/profile.component.ts
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
  originalUser: User | null = null;
  loading = true;
  error: string | null = null;
  editMode = false;
  userService = inject(UserService);

  async ngOnInit() {
    try {
      const response = await getMe();
      this.user = {
        ...response,
        surname: '',
        phonePrefix: '+34',
        phone: '',
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
      this.originalUser = { ...this.user };
      this.editMode = true;
    }
  }

  cancelEdit() {
    if (this.originalUser) {
      this.user = { ...this.originalUser };
    }
    this.editMode = false;
  }

  saveChanges() {
    if (!this.user) return;

    this.userService.updateUser(this.user).then(() => {
      console.log('User updated successfully:', this.user);
    });
    console.log('Saving changes:', this.user);
    this.editMode = false;
  }
}

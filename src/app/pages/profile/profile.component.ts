// src/app/pages/profile/profile.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getMe } from '../../services/getMe';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;
  error: string | null = null;

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
}
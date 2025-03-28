import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  googleHash: string;
  createdAt: string;
  avatarUrl: string;
}

interface UserResponse {
  data: User;
  message: string;
  status: number;
}

// Crear una instancia de Axios con la base URL del entorno
const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  private readonly userUrl = '/mockup/user.json';

  constructor() {}

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const response = await api.get<UserResponse[]>(this.userUrl);
      const userData = response.data.find(r => r.data?.username === username);
      return userData?.data || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}

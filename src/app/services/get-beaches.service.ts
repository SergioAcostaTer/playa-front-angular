import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Beach } from '../models/beach'; // Asegúrate de importar el modelo Beach

// Create an axios instance with the base URL from the environment
const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

@Injectable({
  providedIn: 'root',
})
export class GetBeachesService {
  constructor() {}

  async getBeaches(): Promise<Beach[]> {
    try {
      const response = await api.get<Beach[]>('/mockup/beaches.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching beaches:', error);
      throw error;
    }
  }
}

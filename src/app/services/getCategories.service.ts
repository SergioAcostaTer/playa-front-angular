import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

// Create an axios instance with the base URL from the environment
const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesService {
  constructor() {}

  async getCategories() {
    try {
      const response = await api.get('/mockup/categories.json');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

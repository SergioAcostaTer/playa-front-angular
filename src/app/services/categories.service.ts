import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private api = axios.create({
    baseURL: environment.clientUrl
  });

  async getCategories(): Promise<any> {
    try {
      const response = await this.api.get('/mockup/categories.json');
      return response.data;
    } catch (error) {}
  }
}
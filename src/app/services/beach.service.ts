import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeachService {
  private apiUrl = environment.apiUrl;

  async getBeachBySlug(slug: string): Promise<any> {
    try {
      const { data } = (await axios.get(`${this.apiUrl}/beaches/${slug}`)).data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllBeaches(): Promise<any> {
    try {
      const { data } = (await axios.get(`${this.apiUrl}/beaches?limit=30`)).data;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
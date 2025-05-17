import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { SearchBeachesResponse } from '../models/SearchBeachesResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = environment.apiUrl;

  async searchBeaches(
    query = '',
    page = 1,
    limit = 30,
    filters: {
      name?: string;
      island?: string;
      hasLifeguard?: boolean;
      hasSand?: boolean;
      hasRock?: boolean;
      hasShowers?: boolean;
      hasToilets?: boolean;
      hasFootShowers?: boolean;
      grade?: number | null;
      useGradeFilter?: boolean;
    } = {}
  ): Promise<SearchBeachesResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('q', query);
      queryParams.set('page', String(page));
      queryParams.set('limit', String(limit));

      if (filters.name) queryParams.set('name', filters.name);
      if (filters.island) queryParams.set('island', filters.island);
      if (filters.hasLifeguard === true) queryParams.set('hasLifeguard', 'true');
      if (filters.hasSand === true) queryParams.set('hasSand', 'true');
      if (filters.hasRock === true) queryParams.set('hasRock', 'true');
      if (filters.hasShowers === true) queryParams.set('hasShowers', 'true');
      if (filters.hasToilets === true) queryParams.set('hasToilets', 'true');
      if (filters.hasFootShowers === true) queryParams.set('hasFootShowers', 'true');
      if (filters.grade !== undefined && filters.grade !== null) {
        queryParams.set('grade', String(filters.grade));
      }

      const url = `${this.apiUrl}/beaches?${queryParams.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching beaches search:', error);
      throw error;
    }
  }

  async searchBeachesByProximity(
    latitude: number,
    longitude: number,
    radius: number,
    page = 1,
    limit = 30,
    filters: {
      name?: string;
      hasLifeguard?: boolean;
      hasSand?: boolean;
      hasRock?: boolean;
      hasShowers?: boolean;
      hasToilets?: boolean;
      hasFootShowers?: boolean;
      grade?: number | null;
      useGradeFilter?: boolean;
    } = {}
  ): Promise<SearchBeachesResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('lat', String(latitude));
      queryParams.set('lon', String(longitude));
      queryParams.set('radius', String(radius));
      queryParams.set('page', String(page));
      queryParams.set('limit', String(limit));

      if (filters.name) queryParams.set('name', filters.name);
      if (filters.hasLifeguard === true) queryParams.set('hasLifeguard', 'true');
      if (filters.hasSand === true) queryParams.set('hasSand', 'true');
      if (filters.hasRock === true) queryParams.set('hasRock', 'true');
      if (filters.hasShowers === true) queryParams.set('hasShowers', 'true');
      if (filters.hasToilets === true) queryParams.set('hasToilets', 'true');
      if (filters.hasFootShowers === true) queryParams.set('hasFootShowers', 'true');
      if (filters.grade !== undefined && filters.grade !== null) {
        queryParams.set('grade', String(filters.grade));
      }

      const url = `${this.apiUrl}/beaches/nearby?${queryParams.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby beaches:', error);
      throw error;
    }
  }
}
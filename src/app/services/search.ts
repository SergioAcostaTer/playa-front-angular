// src/services/search.ts
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Beach } from '../models/beach';
import { SearchBeachesResponse } from '../models/SearchBeachesResponse';

export const searchBeaches = async (
  query = '',
  page = 1,
  limit = 30,
  filters: {
    island?: string;
    hasLifeguard?: boolean;
    hasSand?: boolean;
    hasRock?: boolean;
    hasShowers?: boolean;
    hasToilets?: boolean;
    hasFootShowers?: boolean;
  } = {}
): Promise<Beach[]> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.set('q', query);
    queryParams.set('page', String(page));
    queryParams.set('limit', String(limit));

    // Añadir los filtros al query string solo si están definidos y son true
    if (filters.island) queryParams.set('island', filters.island);
    if (filters.hasLifeguard === true) queryParams.set('hasLifeguard', 'true');
    if (filters.hasSand === true) queryParams.set('hasSand', 'true');
    if (filters.hasRock === true) queryParams.set('hasRock', 'true');
    if (filters.hasShowers === true) queryParams.set('hasShowers', 'true');
    if (filters.hasToilets === true) queryParams.set('hasToilets', 'true');
    if (filters.hasFootShowers === true) queryParams.set('hasFootShowers', 'true');

    const url = `${environment.apiUrl}/beaches/search?${queryParams.toString()}`;
    const response = await axios.get(url);
    return response.data.data; // Devolvemos solo la lista de playas
  } catch (error) {
    console.error('Error fetching beaches search:', error);
    throw error;
  }
};
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Beach } from '../models/beach';

interface SearchBeachesResponse {
  status: number;
  data: Beach[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    nextPage: string | null;
    limit: number;
  };
}

export const searchBeaches = async (
  query = '',
  page = 1,
  limit = 30,
  island = ''
): Promise<Beach[]> => {
  try {
    const url = `${environment.apiUrl}/beaches/search?q=${query}&page=${page}&limit=${limit}${island ? `&island=${island}` : ''}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching beaches search:', error);
    throw error;
  }
};
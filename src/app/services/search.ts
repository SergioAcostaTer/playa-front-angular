import axios from 'axios';
import { environment } from '../../environments/environment';

export const searchBeaches = async (query = '', page = 1, limit = 30, island = '') => {
  try {
    const url = `${environment.apiUrl}/beaches/search?q=${query}&page=${page}&limit=${limit}${island ? `&island=${island}` : ''}`;

    const { data } = (await axios.get(url)).data;

    return data;
  } catch (error) {
    console.error('Error fetching beaches search:', error);
    throw error;
  }
};

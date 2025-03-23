import axios from 'axios';
import { environment } from '../../environments/environment';

const api = axios.create({
  baseURL: environment.apiBaseUrl
});

export const getBeaches = async () => {
  try {
    const response = await api.get('/mockup/beaches.json');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
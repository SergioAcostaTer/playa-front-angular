import axios from 'axios';
import { environment } from '../../environments/environment';

const api = axios.create({
  baseURL: environment.clientUrl
});

export const getCategories = async () => {
  try {
    const response = await api.get('/mockup/categories.json');
    return response.data;
  } catch (error) {
  }
};
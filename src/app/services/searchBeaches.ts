import axios from 'axios';
import { environment } from '../../environments/environment';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

export const searchBeaches = async (query: string) => {
  try {
    const { data } = await api.get('/mockup/beaches.json');
    return data.filter((beach: any) =>
      beach.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

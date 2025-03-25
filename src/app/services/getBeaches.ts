import axios from 'axios';
import { environment } from '../../environments/environment';


export const getAllBeaches = async () => {
  try {
    const { data } = (await axios.get(`${environment.apiUrl}/beaches?limit=30`)).data;
    return data;
  } catch (error) {
    throw error;
  }
};


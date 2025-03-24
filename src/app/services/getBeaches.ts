import axios from 'axios';
import { environment } from '../../environments/environment';


export const getAllBeaches = async () => {
  try {
    const { data } = (await axios.get(`${environment.apiUrl}/beaches`)).data;
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};


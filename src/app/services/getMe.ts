import axios from 'axios';
import { environment } from '../../environments/environment';

export const getMe = async () => {
  try {
    const { data } = (
      await axios.get(`${environment.apiUrl}/me`, { withCredentials: true })
    ).data;
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

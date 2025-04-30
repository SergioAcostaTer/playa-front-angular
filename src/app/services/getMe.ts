import axios from 'axios';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

export const getMe = async (): Promise<User> => {
  try {
    const { data } = (
      await axios.get(`${environment.apiUrl}/me`, { withCredentials: true })
    ).data;
    return data;
  } catch (error) {
    throw error;
  }
};

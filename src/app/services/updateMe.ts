import axios from 'axios';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

export const updateMe = async (user: User): Promise<User> => {
  try {
    const { data } = (
      await axios.put(`${environment.apiUrl}/me`, user, {
        withCredentials: true,
      })
    ).data;
    return data;
  } catch (error) {
    throw error;
  }
};

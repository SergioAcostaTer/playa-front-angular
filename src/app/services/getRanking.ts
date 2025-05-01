import axios from 'axios';
import { environment } from '../../environments/environment';

export const getRanking = async () => {
  try {
    const { data } = (await axios.get(`${environment.apiUrl}/ranking`)).data;
    return data;
  } catch (error) {}
};

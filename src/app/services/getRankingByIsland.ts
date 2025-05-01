import axios from 'axios';
import { environment } from '../../environments/environment';

export const getRankingByIsland = async (island: string) => {
  try {
    const { data } = (
      await axios.get(`${environment.apiUrl}/ranking/${island}`)
    ).data;
    return data;
  } catch (error) {}
};

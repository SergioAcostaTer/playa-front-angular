import axios from 'axios';
import { environment } from '../../environments/environment';


export const getBeachBySlug = async (slug: string) => {
  try {
    const { data } = (await axios.get(`${environment.apiUrl}/beaches/${slug}`)).data;
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};


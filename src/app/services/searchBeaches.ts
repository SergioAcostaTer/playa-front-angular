import axios from 'axios';
import { environment } from '../../environments/environment';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

export const searchBeaches = async (query?: string, island?: string) => {
  try {
    const { data } = await api.get('/mockup/beaches.json');
    
    return data.filter((beach: any) => {
      // Convert to lowercase for case-insensitive comparison, with fallback for undefined
      const beachName = beach.name.toLowerCase();
      const beachIsland = beach.island.toLowerCase();
      const searchQuery = query?.toLowerCase() ?? '';
      const searchIsland = island?.toLowerCase() ?? '';
      
      // Check if beach matches both query and island filters
      // If either parameter is undefined, it won't filter by that criterion
      const matchesQuery = searchQuery ? beachName.includes(searchQuery) : true;
      const matchesIsland = searchIsland ? beachIsland.includes(searchIsland) : true;
      
      return matchesQuery && matchesIsland;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
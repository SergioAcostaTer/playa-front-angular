import axios from 'axios';
import { environment } from '../../environments/environment';
import { Beach } from '../models/beach';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

export const searchBeaches = async (query?: string, filters?: any): Promise<Beach[]> => {
  try {
    const { data } = await api.get('/mockup/beaches.json');
    
    return data.filter((beach: Beach) => {
      const beachName = beach.name.toLowerCase();
      const beachIsland = beach.island.toLowerCase();
      const searchQuery = query?.toLowerCase() ?? '';
      const matchesQuery = searchQuery ? beachName.includes(searchQuery) : true;

      if (!filters) return matchesQuery;

      const matchesIsland = filters.island ? beachIsland === filters.island.toLowerCase() : true;
      const matchesLifeguard = filters.hasLifeguard ? beach.lifeguardService !== '' : true;
      const matchesSand = filters.hasSand ? beach.hasSand : true;
      const matchesRock = filters.hasRock ? beach.hasRock : true;
      const matchesShowers = filters.hasShowers ? beach.hasShowers : true;
      const matchesToilets = filters.hasToilets ? beach.hasToilets : true;
      const matchesFootShowers = filters.hasFootShowers ? beach.hasFootShowers : true;

      return matchesQuery && matchesIsland && matchesLifeguard && matchesSand && 
            matchesRock && matchesShowers && matchesToilets && matchesFootShowers;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
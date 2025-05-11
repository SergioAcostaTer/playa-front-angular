import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = environment.apiUrl;

  async getRankingByIsland(island: string): Promise<any> {
    try {
      const { data } = (await axios.get(`${this.apiUrl}/ranking/${island}`)).data;
      return data;
    } catch (error) {}
  }

  async getRanking(): Promise<any> {
    try {
      const { data } = (await axios.get(`${this.apiUrl}/ranking`)).data;
      return data;
    } catch (error) {}
  }
}
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';

// Create an axios instance with the base URL from the environment
const api = axios.create({
  baseURL: environment.apiBaseUrl,
});

@Injectable({
  providedIn: 'root',
})
export class GetCommentsService {
  private readonly commentsUrl = '/mockup/comment.json';

  constructor() {}

  async getComments(): Promise<Comment[]> {
    try {
      const { data } = await api.get<Comment[]>(this.commentsUrl);
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
}

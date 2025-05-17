import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor() {
    this.loadUser();
  }

  async loadUser() {
    try {
      const user = await this.getMe();
      this.userSubject.next(user);
    } catch (e) {
      this.userSubject.next(null);
    }
  }

  clearUser() {
    this.userSubject.next(null);
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  async updateUser(user: User) {
    try {
      const { data } = (await axios.put(`${this.apiUrl}/me`, user, { withCredentials: true })).data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<User> {
    try {
      const { data } = (await axios.get(`${this.apiUrl}/me`, { withCredentials: true })).data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(user: User): Promise<User> {
    try {
      const { data } = (await axios.put(`${this.apiUrl}/me`, user, { withCredentials: true })).data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteMe(): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/me`, { 
        withCredentials: true,
        maxRedirects: 0
      });
      this.clearUser();
    } catch (error: any) {
      if (error.response && [301, 302, 303, 307, 308].includes(error.response.status)) {
        this.clearUser();
        return;
      }
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
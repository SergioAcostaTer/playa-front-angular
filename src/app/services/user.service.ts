import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { getMe } from './getMe';
import { updateMe } from './updateMe';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.loadUser();
  }

  async loadUser() {
    try {
      const user = await getMe();
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
      const updatedUser = await updateMe(user);
      this.userSubject.next(updatedUser);
    } catch (e) {
      console.error('Error updating user:', e);
    }
  }
}

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthStateService } from './auth-state.service';

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _authStateService = inject(AuthStateService);

  constructor() {}

  async register(user: User): Promise<any> {
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    const uid = userCredential.user.uid;
    const userRef = doc(this._firestore, `users/${uid}`);
    await setDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: new Date(),
      imageUrl: user.imageUrl || 'https://www.asofiduciarias.org.co/wp-content/uploads/2018/06/sin-foto.png',
    });
    localStorage.setItem('token', uid);
    return userCredential;
  }

  async login(email: string, password: string): Promise<any> {
    const userCredential = await signInWithEmailAndPassword(this._auth, email, password);
    localStorage.setItem('token', userCredential.user.uid);
    return userCredential;
  }

  async logout(): Promise<void> {
    await signOut(this._auth);
    localStorage.removeItem('token');
  }

  async updateUserData(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this._firestore, `users/${uid}`);
    await updateDoc(userRef, { ...data });
  }
}
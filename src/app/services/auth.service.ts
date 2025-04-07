// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';

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

  async register(user: User): Promise<any> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
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
      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async login(userEmail: string, password: string): Promise<any> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this._auth,
        userEmail,
        password
      );
      return userCredential;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<any> {
    try {
      await signOut(this._auth);
      console.log('Usuario ha cerrado sesión exitosamente');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      throw error;
    }
  }

  async updateUserData(uid: string, data: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this._firestore, `users/${uid}`);
      await updateDoc(userRef, { ...data });
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
}
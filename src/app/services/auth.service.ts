import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _userCollection = collection(this._firestore, 'Users') as CollectionReference<User>;

  async register(user: User) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(this._firestore, `Users/${uid}`), {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: new Date(),
        imageUrl: user.imageUrl || 'https://www.asofiduciarias.org.co/wp-content/uploads/2018/06/sin-foto.png',
      });
      return userCredential;
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('El correo ya está registrado');
        case 'auth/invalid-email':
          throw new Error('El correo no es válido');
        case 'auth/weak-password':
          throw new Error('La contraseña es demasiado débil');
        default:
          throw new Error(`Error durante el registro: ${error.message}`);
      }
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this._auth,
        email,
        password
      );
      return userCredential;
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          throw new Error('Correo o contraseña incorrectos');
        case 'auth/invalid-email':
          throw new Error('El correo no es válido');
        default:
          throw new Error(`Error durante el inicio de sesión: ${error.message}`);
      }
    }
  }

  async logout() {
    try {
      await signOut(this._auth);
    } catch (error: any) {
      throw new Error(`Error during logout: ${error.message}`);
    }
  }

  async updateUser(partialUser: Partial<User>) {
    try {
      if (!partialUser.id) {
        throw new Error('User ID is required');
      }
      const userDoc = doc(this._firestore, `Users/${partialUser.id}`);
      await updateDoc(userDoc, partialUser);
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  getUsers(): Observable<User[]> {
    return collectionData(this._userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(id: string): Observable<User> {
    const userDoc = doc(this._firestore, `Users/${id}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }
}
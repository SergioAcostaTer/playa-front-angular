import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private _userSubject = new BehaviorSubject<FirebaseUser | null>(null);
  public user$: Observable<FirebaseUser | null> = this._userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this._auth, (user) => {
      this._userSubject.next(user);
    });
  }

  get currentUser(): FirebaseUser | null {
    return this._userSubject.getValue();
  }

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
    return userCredential;
  }

  async login(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this._auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this._auth);
    this._userSubject.next(null);
  }

  async updateUserData(uid: string, data: Partial<User>): Promise<void> {
    const userRef = doc(this._firestore, `users/${uid}`);
    await updateDoc(userRef, { ...data });
  }
}

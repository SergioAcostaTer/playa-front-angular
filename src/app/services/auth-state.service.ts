import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import type { User as FirebaseUser } from 'firebase/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);
  private _userSubject = new BehaviorSubject<FirebaseUser | null>(null);
  public user$: Observable<FirebaseUser | null> = this._userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      authState(this._auth).subscribe({
        next: (user) => {
          this._userSubject.next(user || null);
        },
        error: (error) => {
          console.error('Error en authState:', error);
          this._userSubject.next(null);
        },
      });
    }
  }

  get authState$(): Observable<FirebaseUser | null> {
    return authState(this._auth);
  }

  isAuthenticated(): boolean {
    return !!this._userSubject.getValue();
  }

  get currentUser(): FirebaseUser | null {
    return this._userSubject.getValue();
  }
}
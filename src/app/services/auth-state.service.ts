import { inject, Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { Observable, BehaviorSubject } from "rxjs";
import type { User as FirebaseUser } from 'firebase/auth';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private _auth = inject(Auth);
    private _userSubject = new BehaviorSubject<FirebaseUser | null>(this.getInitialUser());
    public user$: Observable<FirebaseUser | null> = this._userSubject.asObservable();

    constructor() {
        authState(this._auth).subscribe((user) => {
            if (user) {
                localStorage.setItem('token', user.uid);
                this._userSubject.next(user);
            } else {
                localStorage.removeItem('token');
                this._userSubject.next(null);
            }
        });
    }

    get authState$(): Observable<any> {
        return authState(this._auth);
    }

    private getInitialUser(): FirebaseUser | null {
        const token = localStorage.getItem('token');
        if (token && this._auth.currentUser?.uid === token) {
            return this._auth.currentUser;
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token') && !!this._userSubject.getValue();
    }

    get currentUser(): FirebaseUser | null {
        return this._userSubject.getValue();
    }
}
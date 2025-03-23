import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {
        this.checkAuthStatus();
    }

    checkAuthStatus(): void {
        const user = localStorage.getItem('user');
        this.isAuthenticatedSubject.next(!!user);
    }

    login(userData: any): void {
        localStorage.setItem('user', JSON.stringify(userData));
        this.isAuthenticatedSubject.next(true);
    }

    logout(): void {
        localStorage.removeItem('user');
        this.isAuthenticatedSubject.next(false);
    }
}
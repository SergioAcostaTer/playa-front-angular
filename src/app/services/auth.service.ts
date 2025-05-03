import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';

// Interfaces para las peticiones y respuestas
interface RegisterRequest {
  email: string;
  password: string;
  name: string; // Nombre completo
}

interface RegisterResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  googleHash: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {
    this.apiUrl = this.envService.getApiUrl();
  }

  register(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, user, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en AuthService:', error);
    return throwError(() => new Error(error.error?.message || 'Error en la solicitud'));
  }
}
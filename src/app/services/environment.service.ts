import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Environment } from '../models/environment.model';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly env = environment;

  get config(): Environment {
    return this.env;
  }

  isProduction(): boolean {
    return this.env.production;
  }

  getApiUrl(): string {
    return this.env.apiUrl;
  }
}
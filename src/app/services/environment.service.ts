import { Injectable } from '@angular/core';
import { Environment } from '../models/environment.model';
import { environment } from '../../environments/environment';

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

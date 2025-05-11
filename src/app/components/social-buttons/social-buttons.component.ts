import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';
import { EnvironmentService } from '../../services/environment.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-social-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.css'],
})
export class SocialButtonsComponent implements OnInit {
  googleUrl: string = '';

  constructor(
    private envService: EnvironmentService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.googleUrl = this.envService.getApiUrl() + '/auth/google';
  }

  async onGoogleLogin(): Promise<void> {
    try {
      // Verificar si hay un usuario logueado
      const currentUser = await firstValueFrom(this.userService.user$);
      if (currentUser) {
        // Realizar logout antes de redirigir a Google
        const logoutUrl = `${this.envService.getApiUrl()}/auth/log-out`;
        await firstValueFrom(this.http.post(logoutUrl, {}, { withCredentials: true }));
        this.userService.clearUser();
        toast.info('Sesión anterior cerrada. Redirigiendo a Google...');
      }

      // Redirigir a la autenticación con Google
      window.location.href = this.googleUrl;
    } catch (error: any) {
      console.error('Error during Google login:', error);
      if (error.message?.includes('Network Error')) {
        toast.error('Error de red. Intenta de nuevo más tarde');
      } else {
        toast.error('Error al iniciar sesión con Google');
      }
    }
  }
}
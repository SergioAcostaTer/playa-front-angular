import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { validateEmail } from '../../utils/validateEmail';
import { validatePasswordLength } from '../../utils/validatePasswordLength';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../services/environment.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PanelImageComponent, SocialButtonsComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  // Propiedades para validaciones y mensajes
  emailValid: boolean = false;
  emailMessage: string = 'Ingresa tu correo electrónico';
  passwordValid: boolean = false;
  passwordMessage: string = 'Ingresa tu contraseña';
  passwordColor: string = 'red';

  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);
  http = inject(HttpClient);
  envService = inject(EnvironmentService);

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
    const validation = validateEmail(this.email);
    this.emailValid = validation.isValid;
    this.emailMessage = validation.message;
  }

  onPasswordChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
    const validation = validatePasswordLength(this.password);
    this.passwordValid = validation.isValid;
    this.passwordColor = validation.color;
    this.passwordMessage = validation.message;
  }

  isFormValid(): boolean {
    return this.emailValid && this.passwordValid;
  }

  togglePassword(): void {
    togglePasswordView('login-password-text', 'login-toggle-icon');
  }

  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      toast.error('Por favor, completa el formulario correctamente');
      console.log('Formulario no válido');
      return;
    }

    // Verificar si hay un usuario logueado
    const currentUser = await firstValueFrom(this.userService.user$);
    if (currentUser) {
      // Realizar logout antes de intentar el nuevo login
      try {
        const logoutUrl = `${this.envService.getApiUrl()}/auth/log-out`;
        await firstValueFrom(this.http.post(logoutUrl, {}, { withCredentials: true }));
        this.userService.clearUser();
        toast.info('Sesión anterior cerrada. Iniciando nueva sesión...');
      } catch (error: any) {
        console.error('Error during logout:', error);
        toast.error('Error al cerrar la sesión anterior. Continuando con el nuevo inicio...');
        this.userService.clearUser(); // Limpiar localmente incluso si falla la solicitud
      }
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response && response.message === 'Login successful' && response.user) {
          console.log('Login exitoso:', response.user);
          this.userService.loadUser();
          this.router.navigate(['/']);
          toast.success('¡Inicio de sesión exitoso!');
        } else {
          console.warn('Credenciales inválidas o error en la respuesta');
          toast.error('Error en el inicio de sesión');
        }
      },
      error: (error: any) => {
        console.error('Error en login:', error);
        if (error.status === 401) {
          toast.error('Correo o contraseña incorrectos');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al iniciar sesión');
        }
      },
    });
  }
}
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner'; // Import toast
import { togglePasswordView } from '../../utils/toggle-password-view';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { validateEmail } from '../../utils/validateEmail';
import { validatePasswordLength } from '../../utils/validatePasswordLength';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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

  onSubmit(): void {
    if (!this.isFormValid()) {
      toast.error('Por favor, completa el formulario correctamente'); // Toast for invalid form
      console.log('Formulario no válido');
      return;
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
          toast.success('¡Inicio de sesión exitoso!'); // Success toast
        } else {
          console.warn('Credenciales inválidas o error en la respuesta');
          toast.error('Error en el inicio de sesión'); // Fallback error toast
        }
      },
      error: (error: any) => {
        console.error('Error en login:', error);
        if (error.status === 401) {
          toast.error('Correo o contraseña incorrectos'); // 401 error toast
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde'); // Network error toast
        } else {
          toast.error('Error al iniciar sesión'); // Generic error toast
        }
      },
    });
  }
}
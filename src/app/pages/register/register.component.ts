import { Component, inject } from '@angular/core';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { passwordsMatch } from '../../utils/passwordsMatch';
import { validatePasswordLength } from '../../utils/validatePasswordLength';
import { validateEmail } from '../../utils/validateEmail';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../services/environment.service';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PanelImageComponent, SocialButtonsComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  termsAccepted: boolean = false;

  // Propiedades para validaciones y mensajes
  emailValid: boolean = false;
  emailMessage: string = 'Ingresa tu correo electrónico';
  passwordValid: boolean = false;
  passwordMessage: string = 'Ingresa tu contraseña';
  passwordColor: string = 'red';
  passwordsMatchValid: boolean = false;
  passwordsMatchMessage: string = 'Confirma tu contraseña';

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
    this.checkPasswordsMatch();
  }

  onConfirmPasswordChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.confirmPassword = input.value;
    this.checkPasswordsMatch();
  }

  onFirstNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.firstName = input.value;
  }

  onLastNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.lastName = input.value;
  }

  onTermsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.termsAccepted = input.checked;
  }

  checkPasswordsMatch(): void {
    const validation = passwordsMatch(this.password, this.confirmPassword);
    this.passwordsMatchValid = validation.isValid;
    this.passwordsMatchMessage = validation.message;
  }

  isFormValid(): boolean {
    return this.emailValid && this.passwordValid && this.passwordsMatchValid && this.termsAccepted && this.firstName.length > 0 && this.lastName.length > 0;
  }

  togglePassword(): void {
    console.log('Toggling password visibility...');
    togglePasswordView('register-password-text', 'register-toggle-icon');
  }

  toggleConfirmationPassword(): void {
    console.log('Toggling password visibility...');
    togglePasswordView('register-password-confirmation-text', 'confirmation-toggle-icon');
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
      // Realizar logout antes de intentar el registro
      try {
        const logoutUrl = `${this.envService.getApiUrl()}/auth/log-out`;
        await firstValueFrom(this.http.post(logoutUrl, {}, { withCredentials: true }));
        this.userService.clearUser();
        toast.info('Sesión anterior cerrada. Procediendo con el registro...');
      } catch (error: any) {
        console.error('Error during logout:', error);
        toast.error('Error al cerrar la sesión anterior. Continuando con el registro...');
        this.userService.clearUser(); // Limpiar localmente incluso si falla la solicitud
      }
    }

    const userData = {
      email: this.email,
      password: this.password,
      name: `${this.firstName} ${this.lastName}`.trim()
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.userService.loadUser(); // Cargar el nuevo usuario
        toast.success('¡Registro exitoso! Bienvenido');
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        if (error.status === 409) {
          toast.error('El correo ya está registrado');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al registrar la cuenta');
        }
      }
    });
  }
}
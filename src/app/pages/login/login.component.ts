import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { validateEmail } from '../../utils/validateEmail';
import { validatePasswordLength } from '../../utils/validatePasswordLength';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor (private router: Router) {}
  
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
    if (this.isFormValid()) {
      const userData = {
        email: this.email,
        password: this.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Usuario registrado y guardado en localStorage:', userData);

      // Redirigir a la ruta raíz usando Router
      this.router.navigate(['/']);
    } else {
      console.log('Formulario no válido');
    }
  }
}
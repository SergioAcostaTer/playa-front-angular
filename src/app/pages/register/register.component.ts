import { Component } from '@angular/core';
import { PanelImageComponent } from "../../components/panel-image/panel-image.component";
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';
import {  passwordsMatch } from '../../utils/passwordsMatch';
import { validatePasswordLength  } from '../../utils/validatePasswordLength';
import { validateEmail } from '../../utils/validateEmail';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PanelImageComponent, SocialButtonsComponent, FormsModule, CommonModule ],
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

  constructor(private router: Router) {}

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

  onSubmit(): void {
    if (this.isFormValid()) {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Usuario registrado y guardado en localStorage:', userData);

      this.router.navigate(['/']);
    } else {
      console.log('Formulario no válido');
    }
  }
}
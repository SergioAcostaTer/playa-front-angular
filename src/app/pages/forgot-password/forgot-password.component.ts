import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { validateEmail } from '../../utils/validateEmail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  emailValid: boolean = false;
  emailMessage: string = 'Ingresa tu correo electrónico';

  constructor(private router: Router) {}

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
    const validation = validateEmail(this.email);
    this.emailValid = validation.isValid;
    this.emailMessage = validation.message;
  }

  isFormValid(): boolean {
    return this.emailValid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const data = {
        email: this.email,
      };
      console.log('Formulario válido, enviando datos:', data);
      this.router.navigate(['/forgot-password/otp-verification']);
    } else {
      console.log('Formulario no válido');
    }
  }
}
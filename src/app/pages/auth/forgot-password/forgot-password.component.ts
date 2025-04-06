import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { validateEmail } from '../../../utils/validation.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailControl() { return this.forgotPasswordForm.get('email'); }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const data = {
        email: this.forgotPasswordForm.value.email,
      };
      this.router.navigate(['/auth/otp-verification']);
    } else {
      console.log('Formulario no válido');
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  getEmailErrorMessage(): string {
    if (!this.emailControl?.touched) return '';
    const email = this.emailControl?.value || '';
    return validateEmail(email).message;
  }
}

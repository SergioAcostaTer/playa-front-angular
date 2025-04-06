import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isRequired, hasEmailError } from '../../../utils/validators';

interface ForgotPasswordForm {
  email: FormControl<string>;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  private _formBuilder = inject(NonNullableFormBuilder);
  private _router = inject(Router);

  forgotPasswordForm = this._formBuilder.group<ForgotPasswordForm>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
  });

  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }

  isRequired(field: 'email') {
    return isRequired(field, this.forgotPasswordForm);
  }

  hasEmailError() {
    return hasEmailError(this.forgotPasswordForm);
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    console.log('Formulario enviado:', { email });
    this._router.navigate(['/auth/otp-verification']);
  }
}
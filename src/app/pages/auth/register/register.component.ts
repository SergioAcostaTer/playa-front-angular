import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { togglePasswordView } from '../../../utils/toggle-password-view';
import { isRequired, hasEmailError, hasPasswordLengthError, hasPasswordMatchError } from '../../../utils/validators';
import { AuthService } from '../../../services/auth.service';
import { toast } from 'ngx-sonner';

interface RegisterForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  terms: FormControl<boolean>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent {
  passwordVisible = false;
  confirmPasswordVisible = false;
  isLoading = false;
  private _formBuilder = inject(NonNullableFormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  registerForm = this._formBuilder.group<RegisterForm>({
    firstName: this._formBuilder.control('', [Validators.required]),
    lastName: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: this._formBuilder.control('', [Validators.required]),
    terms: this._formBuilder.control(false, [Validators.requiredTrue]),
  });

  isRequired(field: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'terms') {
    return isRequired(field, this.registerForm);
  }

  hasEmailError() {
    return hasEmailError(this.registerForm);
  }

  hasPasswordLengthError() {
    return hasPasswordLengthError(this.registerForm);
  }

  hasPasswordMatchError() {
    return hasPasswordMatchError(this.registerForm);
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    togglePasswordView('register-password-text', 'register-toggle-icon');
  }

  toggleConfirmationPassword(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    togglePasswordView('register-password-confirmation-text', 'confirmation-toggle-icon');
  }

  async onSubmit() {
    if (this.registerForm.invalid || this.hasPasswordMatchError()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    try {
      const { firstName, lastName, email, password } = this.registerForm.value;
      await this._authService.register({ firstName: firstName!, lastName: lastName!, email: email!, password: password! });
      toast.success('¡Registro exitoso!');
      this._router.navigate(['/']);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }
}

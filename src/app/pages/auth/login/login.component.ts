import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { togglePasswordView } from '../../../utils/toggle-password-view';
import { hasEmailError, isRequired, hasPasswordLengthError } from '../../../utils/validators';
import { AuthService } from '../../../services/auth.service';
import { toast } from 'ngx-sonner';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent {
  passwordVisible = false;
  isLoading = false;
  private _formBuilder = inject(NonNullableFormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  loginForm = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required, Validators.minLength(6)]),
  });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.loginForm);
  }

  hasEmailError() {
    return hasEmailError(this.loginForm);
  }

  hasPasswordLengthError() {
    return hasPasswordLengthError(this.loginForm);
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    togglePasswordView('login-password-text', 'login-toggle-icon');
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    try {
      const { email, password } = this.loginForm.value;
      await this._authService.login(email!, password!);
      toast.success('¡Bienvenido de nuevo!');
      this._router.navigate(['/']);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }
}

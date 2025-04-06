import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../../utils/toggle-password-view';
import { hasEmailError, isRequired } from '../../../utils/validators';

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
    PanelImageComponent,
    SocialButtonsComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent {
  passwordVisible = false;
  private _formBuilder = inject(NonNullableFormBuilder);
  private _router = inject(Router);
  loginForm = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required, Validators.minLength(8)]),
  });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.loginForm);
  }

  hasEmailError() {
    return hasEmailError(this.loginForm);
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    togglePasswordView('login-password-text', 'login-toggle-icon');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    if (!email || !password) return; // Esto nunca debería pasar con NonNullableFormBuilder, pero lo dejamos por seguridad

    this._router.navigate(['/']);
  }
}
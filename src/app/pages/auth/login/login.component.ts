import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../../utils/toggle-password-view';
import { hasEmailError, isRequired } from '../../../utils/validators';
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
  private _authService = inject(AuthService);

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

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, password } = this.loginForm.value;
    if (!email || !password) return; // Esto no debería ocurrir con NonNullableFormBuilder
  
    try {
      await this._authService.login(email, password);
      toast.success('Bienvenido de nuevo!');
      this._router.navigate(['/']);
    } catch (error: any) {
      console.error('Error en onSubmit:', error); // Para depurar
      toast.error('Error al iniciar sesión: ' + (error.message || 'Inténtalo de nuevo.'));
    }
  }
}
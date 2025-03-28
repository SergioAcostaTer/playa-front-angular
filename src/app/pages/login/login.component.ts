import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';

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
  loginForm: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    togglePasswordView('login-password-text', 'login-toggle-icon');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Usuario registrado y guardado en localStorage:', userData);
      this.router.navigate(['/']);
    } else {
      console.log('Formulario no válido');
      this.loginForm.markAllAsTouched();
    }
  }

  getEmailErrorMessage(): string {
    if (this.emailControl?.hasError('required')) {
      return 'El correo electrónico es obligatorio';
    }
    if (this.emailControl?.hasError('email')) {
      return 'Ingresa un correo electrónico válido (esto@es.ejemplo)';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
    if (this.passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { validateEmail, validatePasswordLength } from '../../utils/validation.service';

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
      password: ['', [Validators.required, Validators.minLength(8)]], // Ajusté a 8 para consistencia
    });
  }

  get emailControl() { return this.loginForm.get('email'); }
  get passwordControl() { return this.loginForm.get('password'); }

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
    if (!this.emailControl?.touched) return '';
    const email = this.emailControl?.value || '';
    return validateEmail(email).message;
  }

  getPasswordErrorMessage(): string {
    if (!this.passwordControl?.touched) return '';
    const password = this.passwordControl?.value || '';
    return validatePasswordLength(password).message;
  }
}

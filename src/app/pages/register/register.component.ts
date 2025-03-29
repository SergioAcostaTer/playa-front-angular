import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { validateEmail, validatePasswordLength, passwordsMatch } from '../../utils/validation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelImageComponent,
    SocialButtonsComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  get firstNameControl() { return this.registerForm.get('firstName'); }
  get lastNameControl() { return this.registerForm.get('lastName'); }
  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
  get termsControl() { return this.registerForm.get('terms'); }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value || '';
    const confirmPassword = form.get('confirmPassword')?.value || '';
    const result = passwordsMatch(password, confirmPassword);
    return result.isValid ? null : { mismatch: true };
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    togglePasswordView('register-password-text', 'register-toggle-icon');
  }

  toggleConfirmationPassword(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    togglePasswordView('register-password-confirmation-text', 'confirmation-toggle-icon');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Usuario registrado y guardado en localStorage:', userData);
      this.router.navigate(['/']);
    } else {
      console.log('Formulario no válido');
      this.registerForm.markAllAsTouched();
    }
  }

  getFirstNameErrorMessage(): string {
    return this.firstNameControl?.hasError('required') ? 'El nombre es obligatorio' : '';
  }

  getLastNameErrorMessage(): string {
    return this.lastNameControl?.hasError('required') ? 'El apellido es obligatorio' : '';
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

  getConfirmPasswordErrorMessage(): string {
    if (!this.confirmPasswordControl?.touched) return '';
    const password = this.passwordControl?.value || '';
    const confirmPassword = this.confirmPasswordControl?.value || '';
    return passwordsMatch(password, confirmPassword).message;
  }

  getTermsErrorMessage(): string {
    return this.termsControl?.hasError('required') && this.termsControl?.touched
      ? 'Debes aceptar los términos y condiciones'
      : '';
  }
}

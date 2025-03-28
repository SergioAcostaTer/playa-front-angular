import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Usamos ReactiveFormsModule en lugar de FormsModule
    PanelImageComponent,
    SocialButtonsComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  passwordVisible = false; // Para el toggle de la contraseña
  confirmPasswordVisible = false; // Para el toggle de la confirmación

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue], // Checkbox debe ser true
    }, { validators: this.passwordMatchValidator }); // Validador personalizado para coincidencia de contraseñas
  }

  // Getters para acceder fácilmente a los controles
  get firstNameControl() { return this.registerForm.get('firstName'); }
  get lastNameControl() { return this.registerForm.get('lastName'); }
  get emailControl() { return this.registerForm.get('email'); }
  get passwordControl() { return this.registerForm.get('password'); }
  get confirmPasswordControl() { return this.registerForm.get('confirmPassword'); }
  get termsControl() { return this.registerForm.get('terms'); }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
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
      this.registerForm.markAllAsTouched(); // Mostrar errores en todos los campos
    }
  }

  // Métodos para mensajes de error
  getFirstNameErrorMessage(): string {
    return this.firstNameControl?.hasError('required') ? 'El nombre es obligatorio' : '';
  }

  getLastNameErrorMessage(): string {
    return this.lastNameControl?.hasError('required') ? 'El apellido es obligatorio' : '';
  }

  getEmailErrorMessage(): string {
    if (this.emailControl?.hasError('required')) {
      return 'El correo electrónico es obligatorio';
    }
    if (this.emailControl?.hasError('email')) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
    if (this.passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (this.confirmPasswordControl?.hasError('required')) {
      return 'Confirma tu contraseña';
    }
    if (this.registerForm.hasError('mismatch') && this.confirmPasswordControl?.touched) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  getTermsErrorMessage(): string {
    return this.termsControl?.hasError('required') && this.termsControl?.touched
      ? 'Debes aceptar los términos y condiciones'
      : '';
  }
}

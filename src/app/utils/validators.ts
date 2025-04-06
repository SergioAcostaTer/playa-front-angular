import { FormGroup, FormControl } from '@angular/forms';

export const isRequired = (field: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'terms', form: FormGroup) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control.touched && control.hasError('email');
};

export const hasPasswordLengthError = (form: FormGroup) => {
  const control = form.get('password');
  return control && control.touched && control.hasError('minlength');
};

export const hasPasswordMatchError = (form: FormGroup) => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');
  return (
    password &&
    confirmPassword &&
    password.touched &&
    confirmPassword.touched &&
    password.value !== confirmPassword.value
  );
};
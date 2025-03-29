// utils/validation.service.ts

export function validatePasswordLength(password: string): { isValid: boolean; color: string; message: string } {
  const isValid = password.length >= 8;
  const color = isValid ? 'green' : 'red';
  const message = isValid
    ? 'Contraseña válida (mínimo 8 caracteres)'
    : password.length === 0
      ? 'Ingresa tu contraseña'
      : 'La contraseña debe tener al menos 8 caracteres';
  return { isValid, color, message };
}

export function validateEmail(email: string): { isValid: boolean; message: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  const message = isValid
    ? 'Correo electrónico válido'
    : email.length === 0
      ? 'Ingresa tu correo electrónico'
      : 'Formato de correo inválido (ejemplo: usuario@dominio.com)';
  return { isValid, message };
}

export function passwordsMatch(password: string, confirmPassword: string): { isValid: boolean; message: string } {
  const isValid = password === confirmPassword && password.length > 0;
  const message = isValid
    ? 'Las contraseñas coinciden'
    : confirmPassword.length === 0
      ? 'Confirma tu contraseña'
      : 'Las contraseñas no coinciden';
  return { isValid, message };
}

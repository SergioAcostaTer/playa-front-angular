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
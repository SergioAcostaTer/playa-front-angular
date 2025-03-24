export function passwordsMatch(password: string, confirmPassword: string): { isValid: boolean; message: string } {
    const isValid = password === confirmPassword && password.length > 0 && confirmPassword.length > 0;
    const message = isValid
        ? 'Las contraseñas coinciden'
        : confirmPassword.length === 0
        ? 'Confirma tu contraseña'
        : 'Las contraseñas no coinciden';
    return { isValid, message };
}
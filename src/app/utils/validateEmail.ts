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
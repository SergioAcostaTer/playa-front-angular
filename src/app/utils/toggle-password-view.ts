export function togglePasswordView(inputId: string, iconId: string): void {
    // Get the input and icon elements by ID
    const passwordInput = document.getElementById(inputId) as HTMLInputElement | null;
    const toggleIcon = document.getElementById(iconId) as HTMLImageElement | null;

    // Check if the elements exist before attempting to modify them
    if (passwordInput && toggleIcon) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.src = "/images/NotShowing.png";
            toggleIcon.alt = "Ocultar contraseña";
        } else {
            passwordInput.type = "password";
            toggleIcon.src = "/images/Showing.png";
            toggleIcon.alt = "Mostrar contraseña";
        }
    } else {
        console.error("Password input or toggle icon not found.");
    }
}

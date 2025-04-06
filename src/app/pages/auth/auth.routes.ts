import { Routes } from "@angular/router";

export default [
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'otp-verification',
        loadComponent: () => import('./otp-verification/otp-verification.component').then(m => m.OTPVerificationComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
] as Routes;
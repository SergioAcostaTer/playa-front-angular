import { Component } from '@angular/core';
import { togglePasswordView } from '../../utils/toggle-password-view';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  togglePassword() {
    togglePasswordView('password-text', 'toggle-icon');
  }
}

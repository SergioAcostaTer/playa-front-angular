import { Component } from '@angular/core';
import { togglePasswordView } from '../../utils/toggle-password-view';
import { PanelImageComponent } from '../../components/panel-image/panel-image.component';
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';

@Component({
  selector: 'app-login',
  imports: [ PanelImageComponent, SocialButtonsComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  togglePassword() {
    togglePasswordView('login-password-text', 'login-toggle-icon');
  }
}

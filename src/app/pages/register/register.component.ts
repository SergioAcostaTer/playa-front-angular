import { Component } from '@angular/core';
import { PanelImageComponent } from "../../components/panel-image/panel-image.component";
import { SocialButtonsComponent } from '../../components/social-buttons/social-buttons.component';
import { togglePasswordView } from '../../utils/toggle-password-view';

@Component({
  selector: 'app-register',
  imports: [PanelImageComponent, SocialButtonsComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';

  togglePassword() {
    console.log('Toggling password visibility...');
    togglePasswordView('register-password-text', 'register-toggle-icon');
  }

  toggleConfirmationPassword() {
    console.log('Toggling password visibility...');
    togglePasswordView('register-password-confirmation-text', 'confirmation-toggle-icon');
  }
}


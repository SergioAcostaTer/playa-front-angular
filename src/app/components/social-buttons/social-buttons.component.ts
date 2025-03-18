import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.css' ],
})
export class SocialButtonsComponent {
  // googleUrl = environment.apiUrl + '/auth/google';
  googleUrl = 'http://localhost:8000/auth/google';
}

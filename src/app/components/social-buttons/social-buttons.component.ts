import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { toast } from 'ngx-sonner'; 
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-social-buttons',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.css'],
})
export class SocialButtonsComponent implements OnInit {
  googleUrl: string = '';

  constructor(private envService: EnvironmentService) {}

  ngOnInit(): void {
    this.googleUrl = this.envService.getApiUrl() + '/auth/google';
  }

  onGoogleLogin(): void {
    try {
      window.location.href = this.googleUrl;
    } catch (error: any) {
      if (error.message?.includes('Network Error')) {
        toast.error('Error de red. Intenta de nuevo más tarde');
      } else {
        toast.error('Error al iniciar sesión con Google');
      }
    }
  }

}
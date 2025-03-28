import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Router } from '@angular/router'; // Importar Router
import { getMe } from '../../services/getMe';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  user: any = null;
  loading: boolean = true;
  isPopupVisible: boolean = false;
  logOut: string = '';

  constructor(
    private envService: EnvironmentService,
    private http: HttpClient, // Inyectar HttpClient
    private router: Router // Inyectar Router
  ) {}

  async ngOnInit() {
    this.logOut = this.envService.getApiUrl() + '/auth/log-out';
    console.log('Logout URL:', this.logOut); // Para depuración
    try {
      this.user = await getMe();
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      this.loading = false;
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  logout(): void {
    console.log('Attempting to log out...');
    this.http.post(this.logOut, {}, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        this.user = null;
        this.closePopup();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
        this.user = null;
        this.closePopup();
        this.router.navigate(['/login']);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isPopupVisible) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.popup__container') && !target.closest('.user-header__menu-toggle')) {
      this.closePopup();
    }
  }
}
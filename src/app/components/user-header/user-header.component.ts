import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { EnvironmentService } from '../../services/environment.service';
import { getMe } from '../../services/getMe';

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
    try {
      this.user = await getMe();
    } catch (error) {
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
        this.user = null;
        this.closePopup();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.user = null;
        this.closePopup();
        this.router.navigate(['/login']);
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.isPopupVisible) return;

    const target = event.target as HTMLElement;
    if (
      !target.closest('.popup__container') &&
      !target.closest('.user-header__menu-toggle')
    ) {
      this.closePopup();
    }
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../services/environment.service';
import { UserService } from '../../services/user.service';

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
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logOut = this.envService.getApiUrl() + '/auth/log-out';

    this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.user = null;
        this.loading = false;
      },
    });
  }

  get isLoggedIn(): boolean {
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
      next: () => this.handleLogout(),
      error: () => this.handleLogout(),
    });
  }

  private handleLogout(): void {
    this.userService.clearUser();
    this.closePopup();
    this.router.navigate(['/login']);
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

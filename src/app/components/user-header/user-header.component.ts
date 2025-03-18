// user-header.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnvironmentService } from '../../services/environment.service';
import { Router } from '@angular/router';  // Import Router for navigation after logout

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  private readonly endpoint = '/me';
  private readonly logOutEndpoint = '/auth/log-out';  // Endpoint for logout
  private readonly defaultAvatar = '/images/avatar.jpg';
  user: any = null;
  isLoading = true;
  avatarError = false;
  isDropdownOpen = false;
  showButtons = false;
  showProfile = false;

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService,
    private router: Router  // Inject Router to navigate after logout
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  private fetchUserData(): void {
    this.isLoading = true;
    const url = `${this.envService.getApiUrl()}${this.endpoint}`;
    
    this.http.get(url, { withCredentials: true }).subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.user = response.data;
        this.isLoading = false;
        this.showProfile = true;
        this.showButtons = false;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.user = null;
        this.isLoading = false;
        this.showProfile = false;
        this.showButtons = true;
      },
    });
  }

  getAvatarUrl(): string {
    if (!this.user || this.avatarError) {
      return this.defaultAvatar;
    }
    return this.user.avatarUrl || this.defaultAvatar;
  }

  onImageError(event: Event): void {
    this.avatarError = true;
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultAvatar;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Logout method
  logout(): void {
    const url = `${this.envService.getApiUrl()}${this.logOutEndpoint}`;
    
    this.http.post(url, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.user = null;
        this.isLoading = false;
        this.router.navigate(['/'], { replaceUrl: true });
      },
      error: (err) => {
        console.error('Error logging out:', err);
        this.isLoading = false;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile-wrapper')) {
      this.isDropdownOpen = false;
    }
  }
}

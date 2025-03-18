import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  private readonly endpoint = '/me';
  private readonly defaultAvatar = '/images/avatar.jpg';
  user: any = null;
  isLoading = true; // Start with loading true
  avatarError = false;

  constructor(
    private http: HttpClient,
    private envService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  private fetchUserData(): void {
    this.isLoading = true; // Ensure loading is true during fetch
    const url = `${this.envService.getApiUrl()}${this.endpoint}`;
    
    this.http.get(url, { withCredentials: true }).subscribe({
      next: (response: any) => {
        console.log('API response:', response);
        this.user = response.data;
        this.isLoading = false; // Loading off after success
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.user = null;
        this.isLoading = false; // Loading off after error
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
}
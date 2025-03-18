// user-header.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  private readonly url = 'http://localhost:8000/me';
  private readonly defaultAvatar = '/images/avatar.jpg';
  user: any = null;
  isLoading = true;
  avatarError = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  private fetchUserData(): void {
    this.isLoading = true;
    this.http.get(this.url, { withCredentials: true }).subscribe({
      next: (response: any) => {  // Type the response if you know the structure
        console.log('API response:', response);
        this.user = response.data;  // Extract the user data from the 'data' property
        console.log('User data:', this.user);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.user = null;
        this.isLoading = false;
      },
    });
  }

  getAvatarUrl(): string {
    console.log(
      'Getting avatar URL. User:',
      this.user,
      'AvatarError:',
      this.avatarError
    );

    if (!this.user || this.avatarError) {
      console.log('Returning default avatar:', this.defaultAvatar);
      return this.defaultAvatar;
    }
    
    const url = this.user.avatarUrl || this.defaultAvatar;
    console.log('Returning URL:', url);
    return url;
  }

  onImageError(event: Event): void {
    console.log('Image load failed for URL:', this.user?.avatarUrl);
    this.avatarError = true;
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultAvatar;
  }
}
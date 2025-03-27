import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommentOnProfileComponent } from '../../components/comment-on-profile/comment-on-profile.component';
import { GetCommentsService } from '../../services/getComments.service'; // Importamos el servicio
import { Comment } from '../../models/comment'; // Asegúrate de que la ruta sea correcta

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  googleHash: string;
  createdAt: string;
  avatarUrl: string;
}

interface UserResponse {
  data: User;
  message: string;
  status: number;
}

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, CommentOnProfileComponent],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: User | null = null;
  comments: Comment[] = [];
  isLoadingComments = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private commentService: GetCommentsService // Inyectamos el servicio
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadComments();
  }

  loadUserData(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      console.error('No username provided in route parameters');
      this.user = null;
      return;
    }

    this.http.get<UserResponse[]>('/mockup/user.json').subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          const userData = response.find(r => r.data?.username === username);
          this.user = userData?.data || null;
          if (!this.user) {
            console.warn(`User with username "${username}" not found in mock data`);
          }
        } else {
          console.error('Expected an array response but received:', response);
          this.user = null;
        }
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
        this.user = null;
      }
    });
  }

  loadComments(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      console.error('No username provided for filtering comments');
      this.isLoadingComments = false;
      return;
    }

    this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments.filter(comment => comment.user.username === username);
        this.isLoadingComments = false;
      },
      error: (err) => {
        console.error('Error loading comments:', err);
        this.comments = [];
        this.isLoadingComments = false;
      }
    });
  }
}

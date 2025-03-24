import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Interfaz actualizada para los comentarios en el nuevo comment.json
interface BeachComment {
  commentId: number;
  user: {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
  };
  beach: {
    id: string;
    name: string;
    island: string;
    coverUrl: string; // Ahora coverUrl está directamente en el comentario
  };
  comment: {
    text: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}

@Component({
  selector: 'app-comment-on-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-on-profile.component.html',
  styleUrls: ['./comment-on-profile.component.css'],
})
export class CommentOnProfileComponent implements OnInit {
  comments: BeachComment[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadComments();
  }

  private loadComments(): void {
    this.http.get<BeachComment[]>('/mockup/comment.json').subscribe(
      (data) => {
        this.comments = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading comments:', error);
        this.isLoading = false;
      }
    );
  }
}

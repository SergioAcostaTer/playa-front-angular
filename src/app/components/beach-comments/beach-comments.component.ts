import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-beach-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './beach-comments.component.html',
  styleUrls: ['./beach-comments.component.css'],
})
export class BeachCommentsComponent {
  @Input() comments: Comment[] = [];
  @Input() currentUser: { id: number; name: string; username: string; avatarUrl: string } = {
    id: 0,
    name: 'Usuario Actual',
    username: 'currentUser',
    avatarUrl: 'images/default-avatar.jpg'
  }; // Información del usuario actual (simulada o pasada desde el padre)
  @Input() beach: { id: string; name: string; island: string; coverUrl: string } = {
    id: '0',
    name: 'Playa Desconocida',
    island: 'Unknown',
    coverUrl: ''
  }; // Información de la playa actual
  @Output() addComment = new EventEmitter<Comment>();

  newCommentText: string = '';
  newCommentRating: number = 5; // Valor por defecto

  onAddComment() {
    if (this.newCommentText.trim()) {
      const currentDate = new Date().toISOString();
      const newComment: Comment = {
        commentId: this.comments.length + 1, // ID temporal (el backend debería generarlo)
        user: this.currentUser, // Usamos la info del usuario actual
        beach: {
          id: this.beach.id,
          name: this.beach.name,
          island: this.beach.island,
          coverUrl: this.beach.coverUrl
        },
        comment: {
          text: this.newCommentText,
          rating: this.newCommentRating,
          createdAt: currentDate,
          updatedAt: currentDate
        }
      };
      this.addComment.emit(newComment);
      this.newCommentText = ''; // Reseteamos el texto
      this.newCommentRating = 5; // Reseteamos la calificación
    }
  }
}

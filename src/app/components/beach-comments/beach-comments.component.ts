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
  @Output() addComment = new EventEmitter<Comment>(); // Evento de salida para notificar al padre

  newCommentText: string = '';
  newCommentAuthor: string = 'You'; // Valor por defecto
  newCommentRating: number = 5; // Valor por defecto

  onAddComment() {
    if (this.newCommentText.trim() && this.newCommentAuthor.trim()) {
      const newComment: Comment = {
        author: this.newCommentAuthor,
        rating: this.newCommentRating,
        text: this.newCommentText,
      };
      this.addComment.emit(newComment); // Emite el nuevo comentario al padre
      this.newCommentText = '';
      this.newCommentAuthor = 'You';
      this.newCommentRating = 5;
    }
  }
}
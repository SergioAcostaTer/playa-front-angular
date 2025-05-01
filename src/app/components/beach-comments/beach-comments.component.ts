import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { Beach } from '../../models/beach';
import { CommentWithBeachAndUser } from '../../services/comments.service';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-beach-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './beach-comments.component.html',
  styleUrls: ['./beach-comments.component.css'],
})
export class BeachCommentsComponent {
  @Input() comments: CommentWithBeachAndUser[] = [];
  @Input() currentUser: User | null = null;
  @Input() beach: Beach | null = null;
  @Output() addComment = new EventEmitter<{ text: string; rating: number }>();

  newCommentText: string = '';
  newCommentRating: number = 5;

  onAddComment() {
    if (
      !this.newCommentText.trim() ||
      this.newCommentRating < 1 ||
      this.newCommentRating > 5
    ) {
      return;
    }
    this.addComment.emit({
      text: this.newCommentText,
      rating: this.newCommentRating,
    });
    this.newCommentText = '';
    this.newCommentRating = 5;
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { Beach } from '../../models/beach';
import { CommentWithBeachAndUser } from '../../services/comments.service';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { AuthStateService } from '../../services/auth-state.service';
import type { User as FirebaseUser } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beach-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './beach-comments.component.html',
  styleUrls: ['./beach-comments.component.css'],
})
export class BeachCommentsComponent implements OnInit{
  @Input() comments: CommentWithBeachAndUser[] = [];
  @Input() currentUser: User | null = null;
  @Input() beach: Beach | null = null;
  @Output() addComment = new EventEmitter<{ text: string; rating: number }>();
  @Output() updateComment = new EventEmitter<{
    id: string;
    text: string;
    rating: number;
  }>();
  @Output() deleteComment = new EventEmitter<string>();
  authStateService = inject(AuthStateService);
  user: FirebaseUser | null = null;
  router = inject(Router)

  newCommentText: string = '';
  newCommentRating: number = 5;

    ngOnInit(): void {
      this.authStateService.user$.subscribe((user) => {
        this.user = user;
      });
    }

  onAddComment() {
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }
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

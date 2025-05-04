import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { CommentWithBeachAndUser } from '../../services/comments.service';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent {
  @Input() comment!: CommentWithBeachAndUser;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{
    id: string;
    text: string;
    rating: number;
  }>();

  currentUser: User | null = null;
  editing: boolean = false;
  editedText: string = '';
  editedRating: number = 0;
  hoveredStar: number = 0;

  constructor(
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  ngOnInit() {
    this.authStateService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  canEdit(): boolean {
    return this.currentUser?.uid === this.comment.user.id;
  }

  startEdit() {
    this.editing = true;
    this.editedText = this.comment.comment.text;
    this.editedRating = this.comment.comment.rating;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    this.update.emit({
      id: this.comment.comment.id,
      text: this.editedText,
      rating: this.editedRating,
    });
    this.editing = false;
  }

  deleteComment() {
    this.delete.emit(this.comment.comment.id);
  }

}

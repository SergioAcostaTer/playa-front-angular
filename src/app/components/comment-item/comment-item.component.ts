import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommentWithBeachAndUser } from '../../services/comments.service';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent {
  @Input() comment!: CommentWithBeachAndUser;

  constructor(private router: Router) {}

  navigateToProfile() {
    const userId = this.comment.user.id;
    if (userId && typeof userId === 'string') {
    } else {
      console.error('Invalid or missing userId for navigation:', userId);
    }
  }
}

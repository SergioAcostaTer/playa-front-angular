import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent {
  @Input() comment!: Comment;

  constructor(private router: Router) {} // Inyecta el Router en el constructor

  navigateToProfile() {
    // console.log('navigateToProfile');
    const username = this.comment?.user?.username;
    if (username && typeof username === 'string' && !username.includes('.css') && !username.includes('.map')) {
      // console.log('Navigating to profile with username:', username); // Depuración
      this.router.navigate(['/view-profile', username]);
    } else {
      console.error('Invalid or missing username for navigation:', username);
    }
  }
}

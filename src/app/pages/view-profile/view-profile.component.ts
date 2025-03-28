import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommentOnProfileComponent } from '../../components/comment-on-profile/comment-on-profile.component';
import { GetCommentsService } from '../../services/getComments.service';
import { GetUserService } from '../../services/get-user.service'; // Nuevo servicio
import { Comment } from '../../models/comment';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  googleHash: string;
  createdAt: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, CommentOnProfileComponent],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  user: User | null = null;
  comments: Comment[] = [];
  isLoadingComments = true;

  constructor(
    private route: ActivatedRoute,
    private commentService: GetCommentsService,
    private userService: GetUserService // Inyectamos el nuevo servicio
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadComments();
  }

  async loadUserData(): Promise<void> {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      console.error('No username provided in route parameters');
      this.user = null;
      return;
    }

    try {
      this.user = await this.userService.getUserByUsername(username);
      if (!this.user) {
        console.warn(`User with username "${username}" not found in mock data`);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      this.user = null;
    }
  }

  async loadComments(): Promise<void> {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      console.error('No username provided for filtering comments');
      this.isLoadingComments = false;
      return;
    }

    try {
      const comments = await this.commentService.getComments();
      this.comments = comments.filter(comment => comment.user.username === username);
      this.isLoadingComments = false;
    } catch (err) {
      console.error('Error loading comments:', err);
      this.comments = [];
      this.isLoadingComments = false;
    }
  }
}

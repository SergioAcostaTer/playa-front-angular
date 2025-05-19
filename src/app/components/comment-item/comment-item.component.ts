import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { Review, ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit {
  @Input() review!: Review;
  @Output() deleteComment = new EventEmitter<number>();

  private reviewService = inject(ReviewService);
  private userService = inject(UserService);

  public isEditing: boolean = false;
  public isLoggedIn: boolean = false;
  public currentUser: User | null = null;
  public tempRating: number = 0;
  public tempComment: string = '';
  public tempImageFile: File | null = null;
  public tempImagePreviewUrl: string | null = null;
  public removeImage: boolean = false;
  public apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  get formattedDate(): string {
    return new Date(this.review.reviews.createdAt).toLocaleDateString();
  }

  get timeAgo(): string {
    const date = new Date(this.review.reviews.createdAt);
    const now = new Date();
    const diffInSeconds = Math.max(
      Math.floor((now.getTime() - date.getTime()) / 1000),
      0
    );

    if (diffInSeconds < 60) return 'hace un momento';
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutos atrás`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} horas atrás`;
    return `${Math.floor(diffInSeconds / 86400)} días atrás`;
  }

  onEditComment(): void {
    this.tempRating = this.review.reviews.rating;
    this.tempComment = this.review.reviews.comment;
    this.tempImagePreviewUrl = this.apiUrl + this.review.reviews.imageUrl;
    this.tempImageFile = null;
    this.removeImage = false;
    this.isEditing = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.tempImageFile = input.files[0];
      this.removeImage = false;

      const reader = new FileReader();
      reader.onload = () => {
        this.tempImagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.tempImageFile);
    }
  }

  onRemoveImage(): void {
    this.tempImageFile = null;
    this.tempImagePreviewUrl = null;
    this.removeImage = true;
  }

  onSaveComment(): void {
    const formData = new FormData();
    formData.append('rating', this.tempRating.toString());
    formData.append('comment', this.tempComment);
    if (this.tempImageFile) {
      formData.append('image', this.tempImageFile);
    }
    if (this.removeImage) {
      formData.append('removeImage', 'true');
    }

    this.reviewService
      .updateReview(this.review.reviews.id.toString(), formData)
      .subscribe((res) => {
        this.review.reviews.rating = this.tempRating;
        this.review.reviews.comment = this.tempComment;
        this.review.reviews.imageUrl = res.review.imageUrl || null;
        this.isEditing = false;
      });
  }

  onCancelEdit(): void {
    this.tempRating = 0;
    this.tempComment = '';
    this.isEditing = false;
  }

  get isCurrentUser(): boolean {
    return this.currentUser?.id === this.review.reviews.userId;
  }

  onDeleteComment(): void {
    this.deleteComment.emit(this.review.reviews.id);
  }
}

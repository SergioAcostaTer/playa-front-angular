import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review, ReviewService } from '../../services/review.service';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-beach-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './beach-comments.component.html',
  styleUrls: ['./beach-comments.component.css'],
})
export class BeachCommentsComponent implements OnInit {
  public reviews: Review[] = [];
  public newCommentText: string = '';
  public newCommentAuthor: string = 'Tú';
  public newCommentRating: number = 5;

  @Input() beachId: string = '0';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (!this.beachId) return;

    this.reviewService.getReviewsForBeach(this.beachId).subscribe((reviews) => {
      this.reviews = reviews.reviews;
    });
  }

  onDeleteComment(reviewId: number): void {
    this.reviewService.deleteReview(reviewId.toString()).subscribe(() => {
      this.reviews = this.reviews.filter(
        (review) => review.reviews.id !== reviewId
      );
    });
  }

  onAddComment(): void {
    if (!this.newCommentText.trim()) return;

    const newReview: any = {
      beachId: this.beachId,
      rating: this.newCommentRating,
      comment: this.newCommentText,
    };

    this.reviewService.createReview(newReview).subscribe((createdReview) => {
      this.reviews.push(createdReview.review);
      this.newCommentText = '';
      this.newCommentRating = 5;
    });
  }
}

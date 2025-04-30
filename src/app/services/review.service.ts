import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

export interface Review {
  reviews: ReviewResponse;
  users: User;
}

export interface ReviewResponse {
  id: number;
  userId: number;
  beachId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = environment.apiUrl + '/reviews';

  constructor(private http: HttpClient) {}

  getReviewsForBeach(beachId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${beachId}`);
  }

  createReview(review: Partial<ReviewResponse>): Observable<any> {
    return this.http.post(this.baseUrl, review, {
      withCredentials: true,
    });
  }

  updateReview(
    reviewId: string,
    review: Partial<ReviewResponse>
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reviewId}`, review, {
      withCredentials: true,
    });
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`, {
      withCredentials: true,
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';
import { Review, ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
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

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.beachId) {
      toast.error('No se proporcionó un ID de playa válido');
      return;
    }

    this.reviewService.getReviewsForBeach(this.beachId).subscribe({
      next: (response) => {
        this.reviews = response.reviews;
        if (!this.reviews || this.reviews.length === 0) {
          toast.info('Esta playa no tiene comentarios aún');
        }
      },
      error: (error: any) => {
        console.error('Error fetching reviews:', error);
        if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al cargar los comentarios');
        }
      },
    });
  }

  onDeleteComment(reviewId: number): void {
    this.reviewService.deleteReview(reviewId.toString()).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(
          (review) => review.reviews?.id !== reviewId
        );
        toast.success('Comentario eliminado correctamente');
      },
      error: (error: any) => {
        console.error('Error deleting review:', error);
        if (error.status === 401) {
          toast.error('No tienes permiso para eliminar este comentario');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al eliminar el comentario');
        }
      },
    });
  }

  public selectedImageFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImageFile = input.files[0];
    }
  }

  async onAddComment(): Promise<void> {
    const user = await firstValueFrom(this.userService.user$);
    if (!user) {
      toast.error('Por favor, inicia sesión para añadir un comentario');
      this.router.navigate(['/login']);
      return;
    }

    const userHasComment = this.reviews.some(
      (review) => review.reviews?.userId === user.id
    );
    if (userHasComment) {
      toast.error('Ya has añadido un comentario para esta playa');
      return;
    }

    if (!this.newCommentText.trim()) {
      toast.error('Por favor, escribe un comentario antes de enviar');
      return;
    }

    const formData = new FormData();
    formData.append('beachId', this.beachId);
    formData.append('rating', this.newCommentRating.toString());
    formData.append('comment', this.newCommentText);
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.reviewService.createReview(formData).subscribe({
      next: (createdReview) => {
        this.reviews.push(createdReview.review);
        this.newCommentText = '';
        this.newCommentRating = 5;
        this.selectedImageFile = null;
        toast.success('Comentario añadido correctamente');
      },
      error: (error: any) => {
        console.error('Error creating review:', error);
        if (error.status === 401) {
          toast.error('Por favor, inicia sesión para añadir un comentario');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al añadir el comentario');
        }
      },
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { toast } from 'ngx-sonner';
import { Review, ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
    return new Date(this.review.reviews.createdAt).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
      return `${Math.floor(diffInSeconds / 60)} minuto${Math.floor(diffInSeconds / 60) === 1 ? '' : 's'} atrás`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hora${Math.floor(diffInSeconds / 3600) === 1 ? '' : 's'} atrás`;
    return `${Math.floor(diffInSeconds / 86400)} día${Math.floor(diffInSeconds / 86400) === 1 ? '' : 's'} atrás`;
  }

  onEditComment(): void {
    if (!this.isCurrentUser) {
      toast.error('No tienes permiso para editar este comentario');
      return;
    }
    this.tempRating = this.review.reviews.rating;
    this.tempComment = this.review.reviews.comment;
    this.tempImagePreviewUrl = this.review.reviews.imageUrl ? this.apiUrl + this.review.reviews.imageUrl : null;
    this.tempImageFile = null;
    this.removeImage = false;
    this.isEditing = true;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecciona un archivo de imagen válido');
        input.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe exceder los 5MB');
        input.value = '';
        return;
      }
      this.tempImageFile = file;
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
    toast.info('Imagen eliminada de la previsualización');
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSaveComment(): void {
    if (!this.tempComment.trim()) {
      toast.error('Por favor, escribe un comentario antes de guardar');
      return;
    }
    if (this.tempRating < 1 || this.tempRating > 5) {
      toast.error('Por favor, selecciona una calificación válida (1-5 estrellas)');
      return;
    }

    const formData = new FormData();
    formData.append('rating', this.tempRating.toString());
    formData.append('comment', this.tempComment.trim());
    if (this.tempImageFile) {
      formData.append('image', this.tempImageFile);
    }
    if (this.removeImage) {
      formData.append('removeImage', 'true');
    }

    this.reviewService.updateReview(this.review.reviews.id.toString(), formData).subscribe({
      next: (res) => {
        this.review.reviews.rating = this.tempRating;
        this.review.reviews.comment = this.tempComment.trim();
        this.review.reviews.imageUrl = res.review.imageUrl || null;
        this.isEditing = false;
        this.tempImageFile = null;
        this.tempImagePreviewUrl = null;
        this.removeImage = false;
        toast.success('Comentario actualizado correctamente');
      },
      error: (error: any) => {
        console.error('Error updating review:', error);
        if (error.status === 401) {
          toast.error('No tienes permiso para actualizar este comentario');
        } else if (error.message?.includes('Network Error')) {
          toast.error('Error de red. Intenta de nuevo más tarde');
        } else {
          toast.error('Error al actualizar el comentario');
        }
      },
    });
  }

  onCancelEdit(): void {
    this.tempRating = 0;
    this.tempComment = '';
    this.tempImageFile = null;
    this.tempImagePreviewUrl = this.review.reviews.imageUrl ? this.apiUrl + this.review.reviews.imageUrl : null;
    this.removeImage = false;
    this.isEditing = false;
    toast.info('Edición cancelada');
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  get isCurrentUser(): boolean {
    return this.currentUser?.id === this.review.reviews.userId;
  }

  onDeleteComment(): void {
    if (!this.isCurrentUser) {
      toast.error('No tienes permiso para eliminar este comentario');
      return;
    }
    this.deleteComment.emit(this.review.reviews.id);
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { BeachDescriptionComponent } from '../../components/beach-description/beach-description.component';
import { MaplibreMapComponent } from '../../components/maplibre-map/maplibre-map.component';
import { BeachCommentsComponent } from '../../components/beach-comments/beach-comments.component';
import { GetCommentsService } from '../../services/getComments.service'; // Ajustado el nombre del archivo
import { Beach } from '../../models/beach';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [
    CommonModule,
    BeachDetailLayoutComponent,
    BeachDescriptionComponent,
    MaplibreMapComponent,
    BeachCommentsComponent,
  ],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailPageComponent implements OnInit {
  beach: Beach | null = null;
  beaches: Beach[] | null = beachesList;
  comments: Comment[] = [];
  currentUser = { id: 1, name: 'Pepe', username: 'pepito', avatarUrl: 'images/avatar.jpg' }; // Simulado

  constructor(
    private route: ActivatedRoute,
    private commentService: GetCommentsService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.beach = this.beaches?.find((beach: Beach) =>
        beach.name?.replace(/ /g, '-')?.toLowerCase() === slug.toLowerCase()
      ) || null;
      if (this.beach) {
        this.loadComments();
      }
    }
  }

  async loadComments() {
    if (!this.beach) return;

    try {
      const comments = await this.commentService.getComments();
      this.comments = comments.filter((comment: Comment) =>
        comment.beach.toLowerCase().replace(/\s+/g, '-') ===
        this.beach!.id.toLowerCase().replace(/\s+/g, '-')
      );
    } catch (err) {
      console.error('Error loading comments:', err);
      this.comments = [];
    }
  }

  addComment(newComment: Comment) {
    this.comments = [...this.comments, newComment];
    // Aquí podrías enviar el comentario a un backend si existiera
  }
}

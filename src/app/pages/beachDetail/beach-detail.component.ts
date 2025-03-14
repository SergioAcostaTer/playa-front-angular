import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { BeachMapComponent } from '../../components/beach-map/beach-map.component';
import { BeachDescriptionComponent } from '../../components/beach-description/beach-description.component';
import { BeachCommentsComponent } from '../../components/beach-comments/beach-comments.component';
import { Beach, Comment } from '../../models/beach'; // Asegúrate de importar la interfaz

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [
    CommonModule,
    BeachDetailLayoutComponent,
    BeachMapComponent,
    BeachDescriptionComponent,
    BeachCommentsComponent,
  ],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailPageComponent implements OnInit {
  beach: any | undefined; // Tipamos correctamente el objeto beach
  beaches: Beach[] = beachesList;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      // Busca la playa cuyo title, normalizado, coincida con el slug
      this.beach = this.beaches.find((beach: Beach) =>
        beach.title?.replace(/ /g, '-')?.toLowerCase() === slug.toLowerCase()
      );
    }
  }

  addComment(newComment: Comment) {
    if (this.beach) {
      // Asegúrate de que comments esté inicializado como un array
      if (!this.beach.comments) {
        this.beach.comments = [];
      }
      this.beach.comments.push(newComment); // Añade el nuevo comentario
    }
  }
}
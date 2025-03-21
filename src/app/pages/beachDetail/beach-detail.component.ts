import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';
import { BeachMapComponent } from '../../components/beach-map/beach-map.component';
import { BeachDescriptionComponent } from '../../components/beach-description/beach-description.component';
import { BeachCommentsComponent } from '../../components/beach-comments/beach-comments.component';
import { Beach, Comment } from '../../models/beach'; // Ensure the interface is imported

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [
    CommonModule,
    BeachDetailLayoutComponent,
    BeachMapComponent,
    BeachDescriptionComponent
],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailPageComponent implements OnInit {
  beach: Beach | null = null;
  beaches: Beach[] = beachesList;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      // Find the beach with a matching normalized name
      this.beach = this.beaches.find((beach: Beach) =>
        beach.name?.replace(/ /g, '-')?.toLowerCase() === slug.toLowerCase()
      ) || null; // Ensure it returns null if no beach is found
    }
  }

  // addComment(newComment: Comment) {
  //   if (this.beach) {
  //     if (!this.beach.comments) {
  //       this.beach.comments = []; // Initialize the comments array if undefined
  //     }
  //     this.beach.comments.push(newComment); // Add the new comment
  //   }
  // }
}

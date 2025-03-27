import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Comment } from '../../models/comment'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-comment-on-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-on-profile.component.html',
  styleUrls: ['./comment-on-profile.component.css'],
})
export class CommentOnProfileComponent {
  @Input() comments: Comment[] = [];
  @Input() isLoading: boolean = true;

  constructor(private router: Router) {}

  navigateToBeach(beachName: string) {
    const normalizedBeachName = beachName.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/beach', normalizedBeachName]);
  }
}

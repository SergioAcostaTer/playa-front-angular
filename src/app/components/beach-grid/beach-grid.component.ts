import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { BeachCardComponent } from '../beach-card/beach-card.component';
import { Beach } from '../../models/beach';
import { beachesList } from '../../constants/beachesList';
import { BeachService } from '../../services/beach.service';

@Component({
  selector: 'app-beach-grid',
  standalone: true,
  imports: [CommonModule, BeachCardComponent],
  templateUrl: './beach-grid.component.html',
  styleUrls: ['./beach-grid.component.css'],
})
export class BeachGridComponent {
  @Input() beaches: Beach[] = [];
  @Input() showEmptyState: boolean = false;
  beachService = inject(BeachService);
  uploadStatus: string = '';
  beachesJson: Beach[] = beachesList;
  
  trackById(index: number, beach: Beach): string {
    return beach.id;
  }
  
  async loadBeachesToFirebase(): Promise<void> {
    try {
      await this.beachService.createBeaches(this.beachesJson);
      this.uploadStatus = 'Beaches uploaded successfully!';
      console.log('Beaches uploaded successfully');
    } catch (error) {
      this.uploadStatus = 'Error uploading beaches';
      console.error('Error uploading beaches:', error);
    }
  }
}

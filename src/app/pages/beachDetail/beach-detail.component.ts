import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList';
import { BeachDetailLayoutComponent } from '../../components/beach-detail-layout/beach-detail-layout.component';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [CommonModule, BeachDetailLayoutComponent],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css']
})
export class BeachDetailPageComponent implements OnInit {
  beach: any | undefined; 
  beaches = beachesList;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (slug) {
      // Busca la playa cuyo title, normalizado, coincida con el slug
      this.beach = this.beaches.find((beach: any) => 
        beach.title?.replace(/ /g, '-')?.toLowerCase() === slug.toLowerCase()
      );
    }
  }
}
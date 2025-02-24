import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList.js';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css']
})
export class BeachDetailPageComponent implements OnInit {
  beach: any | undefined; 
  beaches = beachesList;

  constructor(private route: ActivatedRoute) {}

  getBeachBySlug(slug: string) {
    return this.beaches.find((beach) => beach.title.replace(/ /g, '-').toLowerCase() === slug);
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (slug) {
      this.beach = this.getBeachBySlug(slug);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { beachesList } from '../../constants/beachesList.js';
import { getBeachByName } from '../../services/getBeachByName.js';

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


  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (slug) {
      this.beach = await getBeachByName(slug);
      console.log(this.beach);
    }
  }
}

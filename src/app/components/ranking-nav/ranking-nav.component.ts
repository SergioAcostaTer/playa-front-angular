import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getCategories } from '../../services/getCategories';

@Component({
  selector: 'app-ranking-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './ranking-nav.component.html',
  styleUrl: './ranking-nav.component.css'
})
export class RankingNavComponent {
  @Input() categories: Category[] = [];
}
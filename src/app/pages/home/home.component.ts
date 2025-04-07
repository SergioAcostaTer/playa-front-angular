import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BeachGridComponent } from '../../components/beach-grid/beach-grid.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { Beach } from '../../models/beach';
import { Category } from '../../models/category';
import { GetCategoriesService } from '../../services/getCategories.service';
import { BeachService } from '../../services/beach.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BeachGridComponent,
    CategoryListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  beaches: Beach[] = [];
  loading = true;
  searchQuery: string = '';

  private beachesSub?: Subscription;

  constructor(
    private router: Router,
    private getCategoriesService: GetCategoriesService,
    private beachService: BeachService // Usamos el nuevo servicio
  ) {}

  ngOnInit(): void {
    // 1. Suscribirse a playas (tiempo real)
    this.beachesSub = this.beachService.getAllBeaches().subscribe({
      next: (beaches) => {
        this.beaches = beaches;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading beaches:', err);
        this.beaches = [];
        this.loading = false;
      },
    });

    // 2. Cargar categorías una sola vez
    this.getCategoriesService.getCategories()
      .then((categories) => {
        this.categories = categories;
      })
      .catch((err) => {
        console.error('Error loading categories:', err);
        this.categories = [];
      });
  }

  ngOnDestroy(): void {
    this.beachesSub?.unsubscribe();
  }

  searchBeaches(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}

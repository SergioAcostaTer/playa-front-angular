import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() limit: number = 30;
  @Output() pageChange = new EventEmitter<number>();

  private maxPagesToShow: number = 5;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.updateMaxPagesToShow();
  }

  private updateMaxPagesToShow() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.maxPagesToShow = 3;
    } else {
      this.maxPagesToShow = 5;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMaxPagesToShow();
  }

  get pages(): number[] {
    const pages: number[] = [];
    let startPage: number;
    let endPage: number;

    if (this.totalPages <= this.maxPagesToShow) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      const half = Math.floor(this.maxPagesToShow / 2);
      startPage = Math.max(1, this.currentPage - half);
      endPage = Math.min(this.totalPages, this.currentPage + half);

      if (endPage - startPage + 1 < this.maxPagesToShow) {
        if (startPage === 1) {
          endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);
        } else {
          startPage = Math.max(1, endPage - this.maxPagesToShow + 1);
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.pageChange.emit(page);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-header',
  standalone: true,  // Esto lo marca como componente independiente
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  imports: [CommonModule, HttpClientModule] // HttpClientModule debe estar aquí
})
export class UserHeaderComponent implements OnInit {
  url = 'https://api.playea.eu/me';
  user: any = null;
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error fetching user data:', err)
    });
  }
}

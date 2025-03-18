import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule],  // Importa CommonModule aquí
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  user = {
    "id": 13,
    "name": "Pepe",
    "username": "pepito",
    "email": "pepepepito@gmail.com",
    "googleHash": "123456789123456789012",
    "createdAt": "2025-03-17T20:08:19.838Z",
    "avatarUrl": "/images/avatar.jpg",
  };
}

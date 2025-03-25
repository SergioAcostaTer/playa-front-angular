import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getMe } from '../../services/getMe'; // import getMe function

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  user: any = null; // To hold user data

  async ngOnInit() {
    try {
      this.user = await getMe();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }
}

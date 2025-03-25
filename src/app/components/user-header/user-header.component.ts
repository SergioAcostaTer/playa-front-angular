import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getMe } from '../../services/getMe';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent implements OnInit {
  user: any = null;
  loading: boolean = true;

  async ngOnInit() {
    try {
      this.user = await getMe();
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  get isLoggedIn() {
    return !!this.user;
  }
}

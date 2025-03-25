import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.css' ],
})
export class SocialButtonsComponent implements OnInit {
  
  googleUrl = '';
 constructor(
    private envService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.googleUrl = this.envService.getApiUrl() + '/auth/google';
    console.log(this.googleUrl)
  }
}
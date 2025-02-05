import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeachDetailComponent } from './beach-detail/beach-detail.component';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BeachDetailComponent, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'playa';
}

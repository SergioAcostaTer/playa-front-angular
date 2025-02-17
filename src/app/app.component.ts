import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeachDetailComponent } from './components/beach-detail/beach-detail.component';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'playa';
}

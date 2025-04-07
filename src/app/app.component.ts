import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgxSonnerToaster],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'playa';
}

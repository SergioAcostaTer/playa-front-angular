import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from "../../title-page/title-page.component";
@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingPageComponent {
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitlePageComponent } from "../../components/title-page/title-page.component";
import { RankingListComponent } from '../../components/ranking-list/ranking-list.component';
@Component({
  selector: 'ranking-page',
  standalone: true,
  imports: [CommonModule, TitlePageComponent, RankingListComponent],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingPageComponent {
}

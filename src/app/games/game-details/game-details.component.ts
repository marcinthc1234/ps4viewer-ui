import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game.model';
import { DateHelp } from 'src/app/tools-help/date-help';
import { ArrayHelp } from 'src/app/tools-help/array-help';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  @Input() game: Game;
  
  constructor() { }

  ngOnInit() {
  }

  getReleaseDate(): string {
    if (!ArrayHelp.isEmpty(this.game.release_dates)) {
      let releaseDate = this.game.release_dates[0].date;
      return DateHelp.formatDateSeconds(releaseDate);
    }
    return null;
  }
  
}

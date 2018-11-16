import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GamesListComponent implements OnInit {

  columns: string[];
  games: Game[];

  constructor() { }

  ngOnInit() {
    this.columns = this.getColumns();
    this.games = this.getGames();
  }

  getColumns(): string[] {
    return ['Image', 'Name', 'Company'];
  }

  getGames(): Game[] {
    return [
      new Game('Dark Souls', 'From Software', 'https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg'),
      new Game('Borderlands 2', 'Gearsoft', 'https://upload.wikimedia.org/wikipedia/en/7/77/Borderlands2boxart3.jpg')
    ];
  }
}

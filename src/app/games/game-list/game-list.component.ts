import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css', '../../tools-ui/shared.css'],
  providers: [GameService]
})
export class GamesListComponent implements OnInit {

  columns: string[];
  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.columns = this.getColumns();
    this.getGames();
  }

  getColumns(): string[] {
    return ['', 'Name', 'Company', 'Vote'];
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => {
        this.games = games;
    });
  }
  
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css', '../../tools-css/shared.css'],
  providers: [GameService],
})
export class GamesListComponent implements OnInit {

  columns: string[];
  games: Game[];
  @ViewChild('gamesTable') gamesTable: ElementRef;

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
      this.updateGamesInDom(games);
    });
  }
  
  searchGames(query: string): void {
    this.gameService.searchGames(query).subscribe(games => {
      this.updateGamesInDom(games);
    });
  }

  updateGamesInDom(games: Game[]): void {
    this.games = [];

    var rows = this.gamesTable.nativeElement.rows;
    for (var i = rows.length - 1; i > 0; i--) {
      if (rows[i]) {
        rows[i].remove();
      }
    }

    this.games = games;
  }

  onSearchChange(query: string): void {
    if (query.length >= 3) {
      this.searchGames(query);
    }
  }

}

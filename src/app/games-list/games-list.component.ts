import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  columns: string[];
  games: any[];

  constructor() { }

  ngOnInit() {
    this.columns = this.getColumns();
    this.games = this.getGames();
  }

  getColumns(): string[] {
    return ["Name", "Company"];
  }

  getGames() {
    return [
      {
        Name: 'Dark Souls',
        Company: 'From Software'
      },
      {
        Name: 'Borderlands 2',
        Company: 'Gearsoft'
      }
    ]
  }
}

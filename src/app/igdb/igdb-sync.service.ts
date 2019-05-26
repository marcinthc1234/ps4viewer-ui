import { Injectable } from '@angular/core';
import { IgdbApiService } from './igdb-api.service';
import { LogBoxComponent } from '../tools-ui/log-box/log-box.component';
import { LogBox } from '../tools-ui/log-box/log-box';
import { DateHelp } from '../tools-help/date-help';
import { GameService } from '../games/game.service';

@Injectable({
  providedIn: 'root'
})
export class IgdbSyncService {

  logBox: LogBox;
  requestsCount: number;
  gamesCount: number;
  gamesTotal: number;

  constructor(private igdbApiService: IgdbApiService, private gameService: GameService) { }

  startSync(igdbKey: string, logBoxComponent: LogBoxComponent = null) {
    // initialize input parameters
    this.initialize(igdbKey, logBoxComponent);
    
    this.logBox.appendLine("Starting Synchronization");

    // get count of games to sync
    let lastCreatedAt = 0;
    this.getCountOfGames(lastCreatedAt);

    // sync games
    this.syncGames(lastCreatedAt);
  }

  private initialize(igdbKey: string, logBoxComponent: LogBoxComponent) {
    // initialize log box for logging of status
    this.logBox = new LogBox(logBoxComponent);
    
    // initialize API key and properties
    this.igdbApiService.setApiKey(igdbKey);
    this.requestsCount = 0;
    this.gamesCount = 0;
    this.gamesTotal = 0;
  }

  /**
   * Get games from IGDB API starting from a specific creation date. 
   * After every pack of games this method runs recursively to get the next pack.
   * @param startingFromDate
   * @param requestsMade 
   */
  getCountOfGames(startingFromDate: number) {
    let filters = this.getFilters(startingFromDate);
    this.igdbApiService.getGamesCount(filters).subscribe(count => {
      this.gamesTotal = count;
    });
  }

  /**
   * Get games from IGDB API starting from a specific creation date. 
   * After every pack of games this method runs recursively to get the next pack.
   * @param startingFromDate 
   * @param requestsMade 
   */
  syncGames(startingFromDate: number, requestsMade: number = 0) {
    this.logBox.appendLine("");
    this.logBox.appendLine("Request number " + (requestsMade + 1) + " starting from creation date: " + DateHelp.formatTime(startingFromDate));

    // get games from IGDB
    let filters = this.getFilters(startingFromDate);
    this.igdbApiService.getGames(filters, 'created_at:asc').subscribe(games => {
      games.forEach(game => {
        this.logBox.appendLine("Game received: " + game['name']);
        startingFromDate = game['created_at'];

        // update game in our API
        this.gameService.updateFromIgdb(game);
      });
      requestsMade++;
      if (requestsMade < 2) {
        this.syncGames(startingFromDate, requestsMade);
      }
    });
  }

  private getFilters(startingFromDate: number) {
    let filters = startingFromDate == 0 ? null : ['[created_at][gte]=' + startingFromDate];
    return filters;
  }
  
}

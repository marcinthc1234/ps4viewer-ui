import { Injectable } from '@angular/core';
import { IgdbApiService } from './igdb-api.service';
import { LogBoxComponent } from '../tools-ui/log-box/log-box.component';
import { LogBox } from '../tools-ui/log-box/log-box';
import { DateHelp } from '../tools-help/date-help';
import { ThreadHelp } from '../tools-help/thread-help';
import { GameService } from '../games/game.service';
import { TextHelp } from '../tools-help/text-help';

@Injectable({
  providedIn: 'root'
})
export class IgdbSyncService {

  // Log
  logBox: LogBox;
  
  // UI
  /** Number of requests made for one sync session */
  requestsMade: number;
  /** Games received until now for one sync session */
  gamesCount: number;
  /** Total games expected for one sync session */
  gamesTotal: number;
  /** Changed to true when stop button is pressed */
  stopForced: boolean;

  // Sync
  /** Creation date of last game acquired from IGDB. Used to know where to continue from when syncing again.*/
  lastCreationDate?: number = null;
  /** Update date of last game acquired from IGDB. Used to know where to continue from when syncing again.*/
  lastUpdateDate?: number = null;
  /** Milliseconds between each sent game via the api */
  intervalBetweenApiCalls = 100;

  constructor(private igdbApiService: IgdbApiService, private gameService: GameService) { }

  startSync(igdbKey: string, logBoxComponent: LogBoxComponent = null) {
    // initialize input parameters
    this.initialize(igdbKey, logBoxComponent);
    
    this.logBox.appendLine("Starting Synchronization");

    // sync games (last creation date and last update date are necessary for the sync)
    this.gameService.getLastCreationDate().subscribe(lastCreationDate => {
      // get last creation date
      this.lastCreationDate = lastCreationDate == null ? 0 : lastCreationDate;
      this.getCountOfGamesLeftToSync();
      this.gameService.getLastUpdateDate().subscribe(lastUpdateDate => {
        // get last update date
        if (lastUpdateDate == null) {
          this.lastUpdateDate = DateHelp.nowInSeconds();
          this.gameService.setLastUpdateDate(this.lastUpdateDate);
        } else {
          this.lastUpdateDate = lastUpdateDate;
        }
        this.syncGames();
      });
    });
    
  }

  stopSync() {
    this.stopForced = true;
  }

  private initialize(igdbKey: string = null, logBoxComponent: LogBoxComponent = null) {
    // initialize log box for logging of status
    if (logBoxComponent != null) {
      this.logBox = new LogBox(logBoxComponent);
      this.logBox.reset();
    }
    
    // initialize API key
    if (igdbKey != null) {
      this.igdbApiService.setApiKey(igdbKey);
    }
    
    // initialize UI properties
    this.requestsMade = 0;
    this.gamesCount = 0;
    this.gamesTotal = 0;
    this.stopForced = false;
  }

  /**
   * Get count of games from IGDB API left to sync with our API, either for create or for update.
   * @param forUpdate Indication whether the sync is for creating or updating games.
   */
  getCountOfGamesLeftToSync(forUpdate: boolean = false) {
    let filters = this.getFiltersForCount(forUpdate);
    this.igdbApiService.getGamesCount(filters).subscribe(count => {
      this.gamesTotal = count;
    });
  }

  /**
   * Get games from IGDB API starting from a specific creation date. 
   * After every pack of games this method runs recursively to get the next pack.
   * The way the API call to IGDB is formed, does not allow to continue receiving the next pack 
   * right after the previous game, but instead we request the next games starting from the last creation/update time.
   * This way we will have overlapping games, which we need to check using the previous game ids variable
   * @param forUpdate Indication whether the sync is for creating or updating games.
   * @param previousGameIds
   */
  syncGames(forUpdate: boolean = false, previousGameIds = []) {
    // check if stop is pressed
    if (this.stopForced) {
      this.logBox.appendLine("");
      this.logBox.appendLine("Synchronization aborted after " + this.gamesCount + " games");
      return;
    }

    this.requestsMade++;
    let dateField = this.getDateField(forUpdate);
    this.logBox.appendLine("");
    let logLineLeft = "Request number " + this.requestsMade + " - starting from " + (forUpdate ? 'update' : 'creation') + " date: ";
    let logLineRight = DateHelp.formatDateSecondsFull(forUpdate ? this.lastUpdateDate : this.lastCreationDate);
    this.logBox.appendLine(logLineLeft, logLineRight);
    this.logBox.appendLine("-".repeat(this.logBox.getMaxCharactersPerLine()));

    // get games from IGDB
    let filters = this.getFilters(forUpdate);
    this.igdbApiService.getGames(filters, dateField + ':asc').subscribe(async games => {
      let newPreviousGameIds = [];
      let gamesAlreadyInPreviousPack = 0;
      let gamesNotInPreviousPack = 0;
      
      for (const game of games) {
        // keep last 'created/updated at' time to use for the next pack
        forUpdate ? this.lastUpdateDate = game[dateField] : this.lastCreationDate = game[dateField];

        // log
        let logLineLeft = "Game " + TextHelp.fixLength(game['id'], 6) + " " + (forUpdate ? 'update' : 'create') + ": " + game['name'];
        let logLineRight = DateHelp.formatDateSecondsFull(forUpdate ? this.lastUpdateDate : this.lastCreationDate);
        this.logBox.appendLine(logLineLeft, logLineRight);

        // check if stop is pressed
        if (this.stopForced) {
          this.logBox.appendLine("");
          this.logBox.appendLine("Synchronization aborted after " + this.gamesCount + " games");
          return;
        }

        // delay the process a little (computers are too fast nowadays)
        await ThreadHelp.sleep(this.intervalBetweenApiCalls);

        // if game was not included in the previous pack
        if (!previousGameIds.includes(game['id'])) {
          // create/update game in our API
          if (forUpdate) {
            this.gameService.updateFromIgdb(game);
            this.gameService.setLastUpdateDate(this.lastUpdateDate);
          } else {
            this.gameService.createFromIgdb(game);
          }

          this.gamesCount++;
          gamesNotInPreviousPack++;
        } else {
          gamesAlreadyInPreviousPack++;
        }
        newPreviousGameIds.push(game['id']);
      };

      // if no games are returned from IGDB, then we reached the end of sync
      if (gamesAlreadyInPreviousPack == 0 && gamesNotInPreviousPack == 0) {
        if (!forUpdate) {
          // if sync finished for create, then start sync for update
          this.getCountOfGamesLeftToSync(true);
          this.logBox.appendLine("");
          this.logBox.appendLine("Game sync for creation finished with " + this.gamesCount + " games");
          this.logBox.appendLine("");
          this.logBox.appendLine("Initiating game sync for update");
          this.initialize();
          this.syncGames(true);
          return;
        } else {
          // if sync finished for update, then sync is finished
          this.logBox.appendLine("");
          this.logBox.appendLine("Game sync for update finished with " + this.gamesCount + " games");
          return;
        }
      }

      // if all games we received belong to the previous pack, then add one to the starting date, to get new games (we might lose a game or two here)
      if (gamesNotInPreviousPack == 0) {
        forUpdate ? this.lastUpdateDate++ : this.lastCreationDate++;
        this.logBox.appendLine("All games of this pack were already processed in the previous pack. " +
          "Increasing date by 1 sec to get new games: " + DateHelp.formatDateSeconds(forUpdate ? this.lastUpdateDate : this.lastCreationDate) + 
          " (" + (forUpdate ? this.lastUpdateDate : this.lastCreationDate) + ")");
          this.logBox.appendLine("WARNING: This jump of 1 sec might result in loss of games.");
      }

      // recursively call method for the next pack
      this.syncGames(forUpdate, newPreviousGameIds);
    });
  }

  private getFilters(forUpdate: boolean) {
    let field = this.getDateField(forUpdate);
    let startingFromDate = forUpdate ? this.lastUpdateDate : this.lastCreationDate;
    let filters = startingFromDate == 0 ? null : ['[' + field + '][gte]=' + startingFromDate];
    return filters;
  }

  private getFiltersForCount(forUpdate: boolean) {
    let field = this.getDateField(forUpdate);
    let startingFromDate = forUpdate ? this.lastUpdateDate : this.lastCreationDate;
    let filters = startingFromDate == 0 ? null : [field + ' > ' + startingFromDate];
    return filters;
  }

  private getDateField(forUpdate: boolean) {
    let field = forUpdate ? 'updated_at' : 'created_at';
    return field;
  }
  
}

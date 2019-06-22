import { Component, OnInit, ViewChild } from '@angular/core';
import { IgdbSyncService } from '../igdb-sync.service';
import { LogBoxComponent } from 'src/app/tools-components/log-box/log-box.component';
import { DateHelp } from 'src/app/tools-help/date-help';
import { TypeHelp } from 'src/app/tools-help/type-help';

@Component({
  selector: 'app-igdb-sync',
  templateUrl: './igdb-sync.component.html',
  styleUrls: ['./igdb-sync.component.css'],
  providers: [IgdbSyncService]
})
export class IgdbSyncComponent implements OnInit {

  @ViewChild("logbox") logBoxComponent: LogBoxComponent;
  
  constructor(private igdbSyncService: IgdbSyncService) { }

  ngOnInit() {
  }

  onSynchronizeClick(igdbKey: string) {
    this.igdbSyncService.startSync(igdbKey, this.logBoxComponent);
  }

  onStopClick() {
    this.igdbSyncService.stopSync();
  }

  getLastCreationDate() {
    if (this.igdbSyncService.lastCreationDate == null) {
      return null;
    }
    return DateHelp.formatDateSeconds(this.igdbSyncService.lastCreationDate) + " (" + this.igdbSyncService.lastCreationDate + ")"
  }
  
  getLastUpdateDate() {
    if (this.igdbSyncService.lastUpdateDate == null) {
      return null;
    }
    return DateHelp.formatDateSeconds(this.igdbSyncService.lastUpdateDate) + " (" + this.igdbSyncService.lastUpdateDate + ")"
  }
  
  getGamesSynced() {
    if (this.igdbSyncService.gamesTotal == null) {
      return null;
    }
    return this.igdbSyncService.gamesCount + " / " + this.igdbSyncService.gamesTotal;
  }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IgdbSyncService } from '../igdb-sync.service';
import { LogBoxComponent } from 'src/app/tools-ui/log-box/log-box.component';

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

}

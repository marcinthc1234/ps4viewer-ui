import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games/game-list/game-list.component';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { GameComponent } from './games/game/game.component';
import { IgdbSyncComponent } from './igdb/igdb-sync/igdb-sync.component';

import { HeaderComponent } from './header/header.component';

import { StarsComponent } from './tools-components/stars/stars.component';
import { LogBoxComponent } from './tools-components/log-box/log-box.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { RemoveComponentTagDirective } from './tools-directives/remove-component-tag/remove-component-tag.directive';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    HeaderComponent,
    CompaniesListComponent,
    GameComponent,
    IgdbSyncComponent,
    StarsComponent,
    LogBoxComponent,
    GameDetailsComponent,
    RemoveComponentTagDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games/game-list/game-list.component';
import { HeaderComponent } from './header/header.component';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { GameComponent } from './games/game/game.component';
import { StarsComponent } from './stars/stars.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    HeaderComponent,
    CompaniesListComponent,
    GameComponent,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

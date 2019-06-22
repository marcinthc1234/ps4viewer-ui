import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Game } from '../game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', '../../tools-css/shared.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game;
  gameSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.gameSelected = false;
  }

  onSelect(element: HTMLElement) {
    this.gameSelected = !this.gameSelected;
    if (this.gameSelected) {
      setTimeout(function(){ 
        element.scrollIntoView({behavior:"smooth"});
      }, 50);
    }
  }

}

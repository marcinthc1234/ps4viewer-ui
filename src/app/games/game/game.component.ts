import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Game } from '../game.model';
import { ElementHelp } from 'src/app/tools-help/element-help';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', '../../tools-css/shared.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game;
  gameSelected: boolean;
  /** option whether to scroll to the game on selection */
  scrollToSelected: boolean = false;

  constructor() { }

  ngOnInit() {
    this.gameSelected = false;
  }

  onSelect(element: HTMLElement) {
    this.gameSelected = !this.gameSelected;

    if (this.gameSelected && this.scrollToSelected) {
      ElementHelp.scrollTo(element);
    }
  }

}

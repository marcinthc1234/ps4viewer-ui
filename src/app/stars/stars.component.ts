import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  starCount: number = 0;
  starNumberHovered: number = 0;
  
  constructor() { }

  ngOnInit() {
  }

  onMouseEnter(starNumber : number) {
    this.starNumberHovered = starNumber;
  }

  onMouseLeave(starNumber: number) {
    this.starNumberHovered = 0;
  }
  
  isUnderHovered(starNumber: number): boolean {
    return starNumber <= this.starNumberHovered;
  }
}

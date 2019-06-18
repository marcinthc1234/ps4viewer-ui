import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuItem } from './menu-item.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() menuItemSelected = new EventEmitter<string>();
  MenuItemEnum = MenuItem;

  constructor() { }

  ngOnInit() {
  }

  onSelect(menuItem: string) {
    this.menuItemSelected.emit(menuItem);
  }

}

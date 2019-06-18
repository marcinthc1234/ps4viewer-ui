import { Component } from '@angular/core';
import { MenuItem } from './header/menu-item.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedMenuItem: string;
  MenuItemEnum = MenuItem;

  ngOnInit() {
    this.loadedMenuItem = MenuItem.GAMES;
  }

  onNavigate(menuItem: string) {
    this.loadedMenuItem = menuItem;
  }
}

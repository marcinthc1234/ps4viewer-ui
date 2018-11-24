import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedMenuItem: string = 'games';

  onNavigate(menuItem: string) {
    this.loadedMenuItem = menuItem;
  }
}

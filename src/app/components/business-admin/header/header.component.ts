import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarOpen = false;
  showSearchInput: boolean = false;
  @Output() toggleDrawerEvent = new EventEmitter<void>();

  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
  }

  onToggleDrawer() {
    this.toggleDrawerEvent.emit(); 
    console.log("drawer is toggling")
  }
  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sales-header',
  templateUrl: './sales-header.component.html',
  styleUrls: ['./sales-header.component.css']
})
export class SalesHeaderComponent {
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

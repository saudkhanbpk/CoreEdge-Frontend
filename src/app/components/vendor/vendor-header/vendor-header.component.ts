import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-vendor-header',
  templateUrl: './vendor-header.component.html',
  styleUrls: ['./vendor-header.component.css']
})
export class VendorHeaderComponent {
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

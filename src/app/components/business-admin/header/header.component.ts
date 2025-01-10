import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarOpen = false;
  showSearchInput: boolean = false;
  user:any;
  @Output() toggleDrawerEvent = new EventEmitter<void>();

 constructor(private authService: AuthService) {
    this.user = this.authService.getUserData();
    console.log(this.user);
    
  }


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

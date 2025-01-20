// import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
// import { NotificationService } from 'src/app/services/notification.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit, OnDestroy  {
//   navbarOpen = false;
//   showSearchInput: boolean = false;
//   user:any;
//   notification:any;
//   @Output() toggleDrawerEvent = new EventEmitter<void>();
//   private notificationSubscription!: Subscription;
//   public notifications: any[] = [];
//  constructor(private authService: AuthService, private notificationService: NotificationService) {
//     this.user = this.authService.getUserData();    
//   }

//   ngOnInit(): void {
//     // Listen to new invoice notifications
//     this.notificationSubscription = this.notificationService.listenToInvoiceNotifications().subscribe((notification: any) => {
//       console.log('New notification received:', notification);
      
//       this.notifications.push(notification);
//     });
//   }

//   ngOnDestroy(): void {
//     // Clean up the subscription to prevent memory leaks
//     if (this.notificationSubscription) {
//       // this.notificationService.unsubscribe();
//     }
//   }


//   toggleSearchInput() {
//     this.showSearchInput = !this.showSearchInput;
//   }

//   onToggleDrawer() {
//     this.toggleDrawerEvent.emit(); 
//     console.log("drawer is toggling")
//   }
//   toggleNavbar(): void {
//     this.navbarOpen = !this.navbarOpen;
//   }
// }


import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  showSearchInput: boolean = false;
  user: any;
  @Output() toggleDrawerEvent = new EventEmitter<void>();
  private notificationSubscription!: Subscription;

  // Notifications array to store received notifications
  public notifications: any[] = [];
  unreadCount: number = 0; // To track unread notifications

  constructor(private authService: AuthService, private notificationService: NotificationService) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    // Subscribe to notification service
    this.notificationSubscription = this.notificationService.listenToInvoiceNotifications().subscribe((notification: any) => {
      console.log('New notification received:', notification);

      // Add new notification to the list
      this.notifications.push(notification);
      this.unreadCount++; // Increment unread notifications count
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.unreadCount = 0;
  }

  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
  }

  onToggleDrawer() {
    this.toggleDrawerEvent.emit();
    console.log('drawer is toggling');
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }
}

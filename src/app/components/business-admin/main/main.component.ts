import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isSmallScreen = false;

  @ViewChild(MatDrawer) drawer: MatDrawer | any;

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleDrawer() {
    this.drawer.toggle();
  }
  
  
  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 1200px)']).subscribe(result => {
      setTimeout(() => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.drawer.close();
          this.isSmallScreen = true;
        } else {
          this.drawer.mode = 'side';
          this.drawer.open();
          this.isSmallScreen = false;
        }
      }, 0);
    });
  }
  
  openMenuId: string = '';
  isMenuOpen(menuId: string): boolean {
    return this.openMenuId === menuId;
  }

  openMenu(menuId: string): void {
    this.openMenuId = this.openMenuId === menuId ? '' : menuId;
  }
  menus = [
    { id: 'dashboard', title: 'Dashboard', icon: 'dashboard', link: '/business-admin/dashboard', submenus: [] },
    { id: 'catalog', title: 'Catalog', icon: 'menu_book', link: '/business-admin/catalog', submenus: [] },
    { id: 'request', title: 'Requests', icon: 'request_quote', link: '/business-admin/requests', submenus: [] },
    { id: 'rfq', title: 'Rfq', icon: 'request_quote', link: '/business-admin/rfq', submenus: [] },
    { id: 'quote', title: 'Quote', icon: 'request_quote', link: '/business-admin/quote', submenus: [] },
    { id: 'inventory', title: 'Inventory', icon: 'category', link: '/business-admin/inventory', submenus: [] },
    { id: 'purchaserequest', title: 'Purchase Request', icon: 'request_quote', link: '/business-admin/purchase-request', submenus: [] },
    { id: 'approvals', title: 'Approvals', icon: 'thumb_up', link: '/business-admin/approvals', submenus: [] },
    { id: 'purchaseorder', title: 'Purchase Orders', icon: 'assignment', link: '/business-admin/purchase-orders', submenus: [] },
    { id: 'invoice', title: 'Invoice', icon: 'receipt_long', link: '/business-admin/vendor-invoice', submenus: [] },
    { id: 'receiving', title: 'Receiving', icon: 'move_to_inbox', link: '/business-admin/receiving', submenus: [] },
    { id: 'fulfillmenttasks', title: 'Fulfillment Tasks', icon: 'assignment_turned_in', link: '/business-admin/fulfillment', submenus: [] },
    { id: 'rma', title: 'RMA', icon: 'repeat', link: '/business-admin/rma', submenus: [] },
    { id: 'disputes', title: 'Disputes', icon: 'gavel', link: '/business-admin/disputes', submenus: [] },
    {
      id: 'administration',
      title: 'Administration',
      icon: 'admin_panel_settings',
      submenus: [
        { title: 'Vendors', link: '/business-admin/vendors' },
        { title: 'Contracts', link: '/business-admin/contracts' },
        { title: 'Roles', link: '/business-admin/roles' },
        { title: 'Employees', link: '/business-admin/employees' },
        { title: 'Reports', link: '/business-admin/reports' }
      ]
    },
  ];
}

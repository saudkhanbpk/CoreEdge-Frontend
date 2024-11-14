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
  hovered = false;

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
    //procurement menu
    { id: 'dashboard', title: 'Dashboard', icon: 'dashboard', link: '/business-admin/dashboard', submenus: [] },
    { id: 'catalog', title: 'Catalog', icon: 'menu_book', link: '/business-admin/catalog', submenus: [] },
    { id: 'request', title: 'Requests', icon: 'request_quote', link: '/business-admin/hardware-requests', submenus: [] },
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

    //sales menu
    { id: 'marketing', title: 'Marketing', icon: 'public', link: '/sales/marketing', submenus: [] },
    { id: 'leads', title: 'Leads', icon: 'emoji_people', link: '/sales/leads', submenus: [] },
    { id: 'contacts', title: 'Contacts', icon: 'contacts', link: '/sales/contacts', submenus: [] },
    { id: 'accounts', title: 'Accounts', icon: 'account_circle', link: '/sales/accounts', submenus: [] },
    { id: 'calender', title: 'Calender', icon: 'date_range', link: '/sales/calender', submenus: [] },
    {
      id: 'activities',
      title: 'Activities',
      icon: 'assignment',
      submenus: [
        { title: 'Tasks', link: '/sales/tasks' },
        { title: 'Calls', link: '/sales/calls' },
        { title: 'Emails', link: '/sales/emails' },
        { title: 'Meetings', link: '/sales/meetings' }
      ]
    },
    { id: 'opportunities', title: 'Opportunities', icon: 'insights', link: '/sales/opportunities', submenus: [] },
    { id: 'products', title: 'Products', icon: 'inventory', link: '/sales/products', submenus: [] },
    { id: 'invoicing', title: 'Invoicing', icon: 'receipt_long', link: '/sales/invoicing', submenus: [] },
    {
      id: 'admin',
      title: 'Admin',
      icon: 'admin_panel_settings',
      submenus: [
        { title: 'Sales Workflow Automation', link: '/sales/sales-workflow-automation' },
      ]
    }
  ];
}

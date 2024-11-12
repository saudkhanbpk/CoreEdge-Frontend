import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent {
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

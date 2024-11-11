import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDashboardRoutingModule } from './vendor-dashboard-routing.module';
import { VendorDashboardMainComponent } from './vendor-dashboard-main/vendor-dashboard-main.component';


@NgModule({
  declarations: [
    VendorDashboardMainComponent
  ],
  imports: [
    CommonModule,
    VendorDashboardRoutingModule
  ]
})
export class VendorDashboardModule { }

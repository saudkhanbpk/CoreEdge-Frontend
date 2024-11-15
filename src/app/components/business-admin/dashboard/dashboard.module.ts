import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ActivitiesComponent } from './activities/activities.component';
import { StatscardsComponent } from './statscards/statscards.component';
import { SupplierDetailTableComponent } from './supplier-detail-table/supplier-detail-table.component';
import { OrderStatusChartComponent } from './order-status-chart/order-status-chart.component';
import { VendorPerformanceTableComponent } from './vendor-performance-table/vendor-performance-table.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    DashboardMainComponent,
    ActivitiesComponent,
    StatscardsComponent,
    SupplierDetailTableComponent,
    OrderStatusChartComponent,
    VendorPerformanceTableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }

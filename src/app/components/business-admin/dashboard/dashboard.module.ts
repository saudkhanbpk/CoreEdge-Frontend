import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { StatscardsComponent } from './statscards/statscards.component';
import { OrderStatusChartComponent } from './order-status-chart/order-status-chart.component';
import { VendorPerformanceTableComponent } from './vendor-performance-table/vendor-performance-table.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { RequestsChartComponent } from './requests-chart/requests-chart.component';
import { InventoryDemandComponent } from './inventory-demand/inventory-demand.component';
import { VendorsAndInventoryEvaluationComponent } from './vendors-and-inventory-evaluation/vendors-and-inventory-evaluation.component';
import { PendingRequestsDashboardComponent } from './pending-requests-dashboard/pending-requests-dashboard.component';
import { EmployeeExpendituresComponent } from './employee-expenditures/employee-expenditures.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    StatscardsComponent,
    OrderStatusChartComponent,
    VendorPerformanceTableComponent,
    RequestsChartComponent,
    InventoryDemandComponent,
    VendorsAndInventoryEvaluationComponent,
    PendingRequestsDashboardComponent,
    EmployeeExpendituresComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DashboardModule { }

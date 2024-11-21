import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { StatscardsComponent } from './statscards/statscards.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { PendingRequestsDashboardComponent } from './pending-requests-dashboard/pending-requests-dashboard.component';
import { MonthlyYearlySpendingComponent } from './monthly-yearly-spending/monthly-yearly-spending.component';
import { CategoriesAndContractsComponent } from './categories-and-contracts/categories-and-contracts.component';
import { SpendByDepartmentComponent } from './spend-by-department/spend-by-department.component';
import { SpendBySupplierComponent } from './spend-by-supplier/spend-by-supplier.component';
import { NewInvoicesComponent } from './new-invoices/new-invoices.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    StatscardsComponent,
    PendingRequestsDashboardComponent,
    MonthlyYearlySpendingComponent,
    CategoriesAndContractsComponent,
    SpendByDepartmentComponent,
    SpendBySupplierComponent,
    NewInvoicesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DashboardModule { }

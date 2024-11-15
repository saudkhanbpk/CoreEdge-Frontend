import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

const routes: Routes = [
  {path:'', redirectTo:'invoice-table', pathMatch:'full'},
  {path:'invoice-table', component:InvoiceTableComponent},
  {path:'invoice-details', component:InvoiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorInvoiceRoutingModule { }

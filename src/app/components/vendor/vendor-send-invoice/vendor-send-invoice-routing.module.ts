import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendInvoiceTableComponent } from './send-invoice-table/send-invoice-table.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';

const routes: Routes = [
  {path:'', redirectTo:'send-invoice-table', pathMatch:'full'},
  {path:'send-invoice-table', component:SendInvoiceTableComponent},
  {path:'add-invoice', component:AddInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorSendInvoiceRoutingModule { }

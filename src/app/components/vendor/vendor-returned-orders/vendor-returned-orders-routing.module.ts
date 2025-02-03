import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnedOrderTableComponent } from './returned-order-table/returned-order-table.component';

const routes: Routes = [
  {path:'', redirectTo:'returned-orders-table', pathMatch:'full'},
  {path:'returned-orders-table', component:ReturnedOrderTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorReturnedOrdersRoutingModule { }

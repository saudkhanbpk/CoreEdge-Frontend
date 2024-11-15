import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderTableComponent } from './purchase-order-table/purchase-order-table.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';

const routes: Routes = [
  {path:'', redirectTo:'purchase-order-table', pathMatch:'full'},
  {path:'purchase-order-table', component:PurchaseOrderTableComponent},
  {path:'purchase-order-form', component:PurchaseOrderFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorPurchaseOrderTableComponent } from './vendor-purchase-order-table/vendor-purchase-order-table.component';


const routes: Routes = [
  {path:'', redirectTo:'vendor-purchase-order-table', pathMatch:'full'},
  {path:'vendor-purchase-order-table', component:VendorPurchaseOrderTableComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPurchaseOrderRoutingModule { }

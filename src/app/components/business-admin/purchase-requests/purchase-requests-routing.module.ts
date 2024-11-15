import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseRequestTableComponent } from './purchase-request-table/purchase-request-table.component';
import { PurchaseRequestFormComponent } from './purchase-request-form/purchase-request-form.component';

const routes: Routes = [
  {path:'', redirectTo:'purchase-request-table', pathMatch:'full'},
  {path:'purchase-request-table', component:PurchaseRequestTableComponent},
  {path:'purchase-request-form', component:PurchaseRequestFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';
import { ReviewOrderComponent } from './review-order/review-order.component';

const routes: Routes = [
  {path:'', component:ReceivingOrdersComponent},
  {path:'review-order', component:ReviewOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingRoutingModule { }

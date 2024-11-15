import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';

const routes: Routes = [
  {path:'', component:ReceivingOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivingRoutingModule { }

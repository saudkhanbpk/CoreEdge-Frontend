import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FulfillmentTasksComponent } from './fulfillment-tasks/fulfillment-tasks.component';

const routes: Routes = [
  {path:'', component:FulfillmentTasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FulfillmentRoutingModule { }

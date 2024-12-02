import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RmaRequestsTableComponent } from './rma-requests-table/rma-requests-table.component';
import { EditRmaRequestsComponent } from './edit-rma-requests/edit-rma-requests.component';

const routes: Routes = [
  {path:'', redirectTo:'rma-requests-table', pathMatch:'full'},
  {path:'rma-requests-table' , component:RmaRequestsTableComponent},
  {path:'edit-rma-requests', component:EditRmaRequestsComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaRequestsRoutingModule { }

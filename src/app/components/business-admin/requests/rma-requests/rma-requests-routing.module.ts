import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RmaRequestsComponent } from './rma-requests/rma-requests.component';

const routes: Routes = [
  {path:'', component:RmaRequestsComponent, children:[
    {path:'', redirectTo:'rma-requests', pathMatch:'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaRequestsRoutingModule { }

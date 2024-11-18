import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsMainComponent } from './requests-main/requests-main.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { CompletedRequestsComponent } from './completed-requests/completed-requests.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { CancelledRequestsComponent } from './cancelled-requests/cancelled-requests.component';
import { ViewRequestComponent } from './view-request/view-request.component';

const routes: Routes = [
  {path:'', component:RequestsMainComponent, children:[
    {path:'', redirectTo:'pending-requests', pathMatch:'full'},
    {path:'pending-requests', component:PendingRequestsComponent},
    {path:'completed-requests', component:CompletedRequestsComponent},
    {path:'rejected-requests', component:RejectedRequestsComponent},
    {path:'cancelled-requests', component:CancelledRequestsComponent},
    {path:'view-request', component:ViewRequestComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HardwareRequestsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsMainComponent } from './requests-main/requests-main.component';
import { RmaRequestsComponent } from './requests-main/rma-requests/rma-requests.component';
import { HardwareRequestsComponent } from './requests-main/hardware-requests/hardware-requests.component';

const routes: Routes = [
  {path:'', component:RequestsMainComponent , children:[
    {path:'', redirectTo:'hardware-requests', pathMatch:'full'},
    { path: 'hardware-requests', component: HardwareRequestsComponent},
    { path: 'rma-requests', component: RmaRequestsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }

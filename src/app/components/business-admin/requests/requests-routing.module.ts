import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsMainComponent } from './requests-main/requests-main.component';

const routes: Routes = [
  {path:'', component:RequestsMainComponent , children:[
    {path:'', redirectTo:'hardware-requests', pathMatch:'full'},
    { path: 'hardware-requests', loadChildren: () => import('./hardware-requests/hardware-requests.module').then(m => m.HardwareRequestsModule) },
    { path: 'rma-requests', loadChildren: () => import('./rma-requests/rma-requests.module').then(m => m.RmaRequestsModule) },


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }

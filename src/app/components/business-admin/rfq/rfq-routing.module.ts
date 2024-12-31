import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { RfqMainComponent } from './rfq-main/rfq-main.component';
import { RfqAllrfqsComponent } from './rfq-allrfqs/rfq-allrfqs.component';
import { RequisitonedRfqComponent } from './requisitoned-rfq/requisitoned-rfq.component';
import { AcceptedRfqComponent } from './accepted-rfq/accepted-rfq.component';
import { RejectedRfqComponent } from './rejected-rfq/rejected-rfq.component';
import { AddRfqComponent } from './add-rfq/add-rfq.component';
import { ViewRfqComponent } from './view-rfq/view-rfq.component';

const routes: Routes = [
  {path:'', redirectTo:'rfq-main', pathMatch:'full'},
  {path:'rfq-main', component:RfqMainComponent, children:[
    {path:'', redirectTo:'all-rfqs', pathMatch:'full'},
    {path:'all-rfqs', component:RfqAllrfqsComponent},
    {path:'requisitioned-rfq', component:RequisitonedRfqComponent},
    {path:'accepted-rfq', component:AcceptedRfqComponent},
    {path:'rejected-rfq', component:RejectedRfqComponent}
  ]},
  {path:'create-rfq', component:AddRfqComponent},
  {path:'view-rfq', component:ViewRfqComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RfqRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardMainComponent } from './vendor-dashboard-main/vendor-dashboard-main.component';

const routes: Routes = [
  {path:'', component:VendorDashboardMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDashboardRoutingModule { }

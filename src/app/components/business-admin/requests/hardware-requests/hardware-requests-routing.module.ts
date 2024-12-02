import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardwareRequestsTableComponent } from './hardware-requests-table/hardware-requests-table.component';
import { EditHardwareRequestsComponent } from './edit-hardware-requests/edit-hardware-requests.component';

const routes: Routes = [
  {path:'', redirectTo:'hardware-requests-table', pathMatch:'full'},
  {path:'hardware-requests-table' , component:HardwareRequestsTableComponent},
  {path:'edit-hardware-requests', component:EditHardwareRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HardwareRequestsRoutingModule { }

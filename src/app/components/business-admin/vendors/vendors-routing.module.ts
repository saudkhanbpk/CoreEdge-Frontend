import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsTableComponent } from './vendors-table/vendors-table.component';
import { VendorsFormComponent } from './vendors-form/vendors-form.component';

const routes: Routes = [
  {path:'', redirectTo:'vendors-table', pathMatch:'full'},
  {path:'vendors-table', component:VendorsTableComponent},
  {path:'add-vendors', component:VendorsFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }

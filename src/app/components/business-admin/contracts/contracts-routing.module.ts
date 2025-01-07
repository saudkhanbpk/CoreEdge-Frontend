import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsTableComponent } from './contracts-table/contracts-table.component';
import { ContractsFormComponent } from './contracts-form/contracts-form.component';

const routes: Routes = [
  {path:'', redirectTo:'contracts-table', pathMatch:'full'},
  {path:'contracts-table', component:ContractsTableComponent},
  {path:'contracts-form', component:ContractsFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }

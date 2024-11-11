import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

const routes: Routes = [
  {path:'', redirectTo:'employees-table', pathMatch:'full'},
  {path:'employees-table', component:EmployeesTableComponent},
  {path:'employees-form', component:EmployeesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesFormComponent } from './roles-form/roles-form.component';

const routes: Routes = [
  {path:'', redirectTo:'roles-table', pathMatch:'full'},
  {path:'roles-table', component:RolesTableComponent},
  {path:'add-roles', component:RolesFormComponent},
  {path:'edit-roles', component:RolesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }

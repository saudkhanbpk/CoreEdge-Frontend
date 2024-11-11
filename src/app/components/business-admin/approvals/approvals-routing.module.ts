import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsTableComponent } from './approvals-table/approvals-table.component';

const routes: Routes = [
  {path:'', redirectTo:'approvals-table', pathMatch:'full'},
  {path:'approvals-table', component:ApprovalsTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }

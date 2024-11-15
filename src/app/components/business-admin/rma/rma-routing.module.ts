import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnMerchandiseAuthorizationComponent } from './return-merchandise-authorization/return-merchandise-authorization.component';

const routes: Routes = [
  {path:'', component:ReturnMerchandiseAuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaRoutingModule { }

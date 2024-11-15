import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisputesResolutionComponent } from './disputes-resolution/disputes-resolution.component';

const routes: Routes = [
  {path:'', component:DisputesResolutionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputesRoutingModule { }

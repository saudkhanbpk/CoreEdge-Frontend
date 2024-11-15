import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [
  {path:'', redirectTo:'inventory-menu', pathMatch:'full'},
  {path:'inventory-menu', component:InventoryMenuComponent},
  {path:'inventory-form', component:AddInventoryComponent},
  {path:'inventory-form/:id', component:AddInventoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }

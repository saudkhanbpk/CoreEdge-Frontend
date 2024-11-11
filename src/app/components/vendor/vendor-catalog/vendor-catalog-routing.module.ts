import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogTableComponent } from './catalog-table/catalog-table.component';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';

const routes: Routes = [
  {path:'', redirectTo:'catalog-table', pathMatch:'full'},
  {path:'catalog-table', component:CatalogTableComponent},
  {path:'add-catalog' , component:AddCatalogComponent},
  {path:'add-catalog/:id', component:AddCatalogComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorCatalogRoutingModule { }

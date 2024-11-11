import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorCatalogRoutingModule } from './vendor-catalog-routing.module';
import { CatalogTableComponent } from './catalog-table/catalog-table.component';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CatalogTableComponent,
    AddCatalogComponent
  ],
  imports: [
    CommonModule,
    VendorCatalogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers:[
    DataService
  ]
})
export class VendorCatalogModule { }

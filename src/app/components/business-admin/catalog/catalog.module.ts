import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { FiltersComponent } from './filters/filters.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddedProductsComponent } from './added-products/added-products.component';


@NgModule({
  declarations: [
    CatalogMenuComponent,
    FiltersComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AddedProductsComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[DataService]
})
export class CatalogModule { }

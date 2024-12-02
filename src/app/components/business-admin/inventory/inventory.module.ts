import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { VendorsService } from 'src/app/services/vendors.service';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryProductDetailsComponent } from './inventory-product-details/inventory-product-details.component';


@NgModule({
  declarations: [
    AddInventoryComponent,
    InventoryMenuComponent,
    InventoryProductDetailsComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[DataService,VendorsService,AuthService,InventoryService]
})
export class InventoryModule { }

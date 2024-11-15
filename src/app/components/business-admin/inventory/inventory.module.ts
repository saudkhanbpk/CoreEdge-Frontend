import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddInventoryComponent,
    InventoryMenuComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[DataService]
})
export class InventoryModule { }

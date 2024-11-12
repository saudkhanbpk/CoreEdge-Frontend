import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesMainComponent } from './sales-main/sales-main.component';
import { MaterialModule } from 'src/app/material';
import { SalesHeaderComponent } from './sales-header/sales-header.component';


@NgModule({
  declarations: [
    SalesMainComponent,
    SalesHeaderComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule
  ]
})
export class SalesModule { }

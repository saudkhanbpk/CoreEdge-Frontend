import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorMainComponent } from './vendor-main/vendor-main.component';
import { MaterialModule } from 'src/app/material';
import { VendorHeaderComponent } from './vendor-header/vendor-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorMainComponent,
    VendorHeaderComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendorModule { }

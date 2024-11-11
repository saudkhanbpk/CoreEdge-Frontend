import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsTableComponent } from './vendors-table/vendors-table.component';
import { VendorsFormComponent } from './vendors-form/vendors-form.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorsTableComponent,
    VendorsFormComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendorsModule { }

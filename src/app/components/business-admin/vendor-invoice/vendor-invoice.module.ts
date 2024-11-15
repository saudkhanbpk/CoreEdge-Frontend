import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorInvoiceRoutingModule } from './vendor-invoice-routing.module';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    InvoiceTableComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    VendorInvoiceRoutingModule,
    MaterialModule
  ]
})
export class VendorInvoiceModule { }

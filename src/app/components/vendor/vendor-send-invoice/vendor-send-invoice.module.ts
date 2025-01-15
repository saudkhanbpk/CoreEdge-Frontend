import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorSendInvoiceRoutingModule } from './vendor-send-invoice-routing.module';
import { SendInvoiceTableComponent } from './send-invoice-table/send-invoice-table.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendInvoiceTableComponent,
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    VendorSendInvoiceRoutingModule,
    MaterialModule,
    FormsModule
    
  ]
})
export class VendorSendInvoiceModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPurchaseOrderRoutingModule } from './vendor-purchase-order-routing.module';
import { MaterialModule } from 'src/app/material';
import { VendorPurchaseOrderTableComponent } from './vendor-purchase-order-table/vendor-purchase-order-table.component';
import { VendorViewPurchaseOrderComponent } from './vendor-view-purchase-order/vendor-view-purchase-order.component';
import { VendorUpdatePriceComponent } from './vendor-update-price/vendor-update-price.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VendorPurchaseOrderTableComponent,
    VendorViewPurchaseOrderComponent,
    VendorUpdatePriceComponent
  ],
  imports: [
    CommonModule,
    VendorPurchaseOrderRoutingModule,
    MaterialModule,
    FormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class VendorPurchaseOrderModule { }

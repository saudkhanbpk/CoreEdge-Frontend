import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmaRoutingModule } from './rma-routing.module';
import { ReturnMerchandiseAuthorizationComponent } from './return-merchandise-authorization/return-merchandise-authorization.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    ReturnMerchandiseAuthorizationComponent
  ],
  imports: [
    CommonModule,
    RmaRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class RmaModule { }

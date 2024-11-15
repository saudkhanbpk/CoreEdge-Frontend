import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmaRoutingModule } from './rma-routing.module';
import { ReturnMerchandiseAuthorizationComponent } from './return-merchandise-authorization/return-merchandise-authorization.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReturnMerchandiseAuthorizationComponent
  ],
  imports: [
    CommonModule,
    RmaRoutingModule,
    FormsModule
  ]
})
export class RmaModule { }

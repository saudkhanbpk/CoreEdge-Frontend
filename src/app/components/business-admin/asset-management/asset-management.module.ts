import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetsMainComponent } from './assets-main/assets-main.component';


@NgModule({
  declarations: [
    AssetsMainComponent
  ],
  imports: [
    CommonModule,
    AssetManagementRoutingModule
  ]
})
export class AssetManagementModule { }

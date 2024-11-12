import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessAdminRoutingModule } from './business-admin-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from 'src/app/material';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../../services/auth/auth-interceptor.service'; // Adjust the path according to your structure


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BusinessAdminRoutingModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
})
export class BusinessAdminModule { }

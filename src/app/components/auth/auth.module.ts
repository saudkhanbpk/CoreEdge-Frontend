import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding/onboarding.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }

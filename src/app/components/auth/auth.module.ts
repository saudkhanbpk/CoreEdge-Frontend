import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    OnboardingComponent,
    BusinessDetailsComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }

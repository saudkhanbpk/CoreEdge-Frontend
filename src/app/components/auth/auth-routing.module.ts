import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
  {path:'', redirectTo:'onboarding', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'onboarding', component:OnboardingComponent},
  {path:'business-details', component:BusinessDetailsComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'verify-otp', component:VerifyOtpComponent},
  {path:'recover-password', component:RecoverPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

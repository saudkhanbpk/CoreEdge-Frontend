import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 fullName: string = '';
 email: string = '';
 password: string = '';
 address: string = '';
 businessName: string = '';
 isCustomer: boolean = true; 
 wantsBusiness: boolean = false; 
 hide: boolean = true;
 hideconfirmpassword: boolean = true;
 signUp() {
   console.log('Sign Up Data:', {
     fullName: this.fullName,
     email: this.email,
     password: this.password,
     address: this.address,
     businessName: this.businessName,  
     isCustomer: this.isCustomer,
     wantsBusiness: this.wantsBusiness
   });
 }
}

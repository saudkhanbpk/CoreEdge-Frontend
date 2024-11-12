import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService: UserService){

  }
 fullName: string = '';
 email: string = '';
 password: string = '';
 address: string = '';
 businessName: string = '';
 isCustomer: boolean = true; 
 wantsBusiness: boolean = false; 
 hide: boolean = true;
 
 signUp() {
  let signUpData = {
    fullName: this.fullName,
    email: this.email,
    password: this.password,
    address: this.address,
    businessName: this.businessName,  
    isCustomer: this.isCustomer,
    wantsBusiness: this.wantsBusiness,
    role:'Admin'
  }
  console.log('Sign Up Data:', signUpData);  // Ensure fullName has a value here
  this.userService.signup(signUpData).subscribe(
    (response: any) => {
      console.log('User signed up successfully:', response);
    },
    (error: any) => {
      console.error('Signup error:', error);
    }
  );
}

}

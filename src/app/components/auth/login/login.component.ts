import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;
  constructor(private userService: UserService,  private router: Router, private authService: AuthService){

  }
  adminLogin() {
   let signinData= {
      email: this.email,
      password: this.password
    }
    console.log('Admin Login Data:', );

    this.userService.signin(signinData).subscribe(
      (response: any) => {
        // Save the token using AuthService
        this.authService.setToken(response.token);
        console.log("user : ",response.user);
        
        this.authService.saveUserData(response.user);
  
        // Navigate based on the user role
        if (response.user.role === 'Admin') {
          this.router.navigate(['/business-admin']);
        } else if (response.user.role === 'vendor') {
          this.router.navigate(['/vendor']);
        }
      },
      (error: any) => {
        console.error('Signup error:', error);
      }
    );
  }
}

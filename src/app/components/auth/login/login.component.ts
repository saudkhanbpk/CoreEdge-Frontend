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
  // adminLogin() {
  //  let signinData= {
  //     email: this.email,
  //     password: this.password
  //   }
  //   console.log('Admin Login Data:',signinData );

  //   this.userService.signin(signinData).subscribe(
  //     (response: any) => {
  //       // Save the token using AuthService
  //       this.authService.setToken(response.token);
  //       console.log("user : ",response.user);
        
  //       this.authService.saveUserData(response.user);
  
  //       // Navigate based on the user role
  //       if (response.user.role === 'Admin') {
  //         this.router.navigate(['/business-admin']);
  //       } else if (response.user.role === 'vendor') {
  //         this.router.navigate(['/vendor']);
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Signup error:', error);
  //     }
  //   );
  // }


  adminLogin(form: any) {
    if (form.invalid) {
      console.warn('Form is invalid!');
      return;
    }

    const signinData = {
      email: this.email,
      password: this.password
    };

    console.log('Admin Login Data:', signinData);

    this.userService.signin(signinData).subscribe(
      (response: any) => {
        // Save the token and user data using AuthService
        this.authService.setToken(response.token);
        this.authService.saveUserData(response.user);

        console.log('User:', response.user);

        // Navigate based on the user role
        if (response.user.role === 'Admin') {
          this.router.navigate(['/business-admin']);
        } else if (response.user.role === 'vendor') {
          this.router.navigate(['/vendor']);
        } else {
          console.warn('Unknown role:', response.user.role);
        }
      },
      (error: any) => {
        console.error('Login error:', error);
      }
    );
  }
}

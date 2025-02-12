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
  isloading: boolean = false;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {

  }
  adminLogin(form: any) {
    if (form.invalid) {
      console.warn('Form is invalid!');
      return;
    }
    this.isloading = true;
    const signinData = {
      email: this.email,
      password: this.password
    };

    this.userService.signin(signinData).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.authService.saveUserData(response.user);
        if (response.user.role === 'Admin') {
          this.router.navigate(['/business-admin']);
        } else if (response.user.role === 'vendor') {
          this.router.navigate(['/vendor']);
        } else {
          console.warn('Unknown role:', response.user.role);
        }
      },
      (error: any) => {
        this.isloading = false;
        alert('Invalid email or password');
        console.error('Login error:', error);
      }
    );
  }
}

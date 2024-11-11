import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;
  adminLogin() {
    console.log('Admin Login Data:', {
      email: this.email,
      password: this.password
    });
  }
}

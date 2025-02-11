import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hide: boolean = true;
  hideconfirmpassword: boolean = true;

  constructor(private router: Router) { }

  signUp() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const signUpData = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: 'Admin'
    };
    this.router.navigate(['/auth/business-details'], { state: { userData: signUpData } });
  }
}


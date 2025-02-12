import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading:boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (!this.email) {
      alert('Please enter your email.');
      return;
    }
    this.isLoading = true;
    this.userService.forgotPassword(this.email).subscribe(
      () => {
        // alert('OTP sent to your email.');
        this.router.navigate(['/auth/verify-otp'], { queryParams: { email: this.email } });
      },
      (error) => {
        console.error('Error sending OTP:', error);
        this.isLoading = false;

        alert('Error sending OTP. Please try again.');
      }
    );
  }
}

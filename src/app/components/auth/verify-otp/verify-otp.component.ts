import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  email: string = '';
  otp: string[] = ['', '', '', '']; 
  minutes: number = 2;
  seconds: number = 0;
  interval: any;
  otpSent: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || 'user@example.com';
    });

    this.startTimer();
  }

  onInputChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Move to next input if a digit is entered
    if (value.length === 1 && index < this.otpInputs.length - 1) {
      const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
      nextInput.focus();
    }

    // Move back if deleted
    if (value.length === 0 && index > 0) {
      const prevInput = this.otpInputs.toArray()[index - 1].nativeElement;
      prevInput.focus();
    }
  }

  startTimer(): void {
    this.minutes = 2;
    this.seconds = 0;
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.interval);
          this.otpSent = false; 
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  requestNewOtp(): void {
    this.otpSent = true; 
    this.userService.forgotPassword(this.email).subscribe(
      () => {
        // alert('A new OTP has been sent to your email.');
        this.startTimer();
      },
      (error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send new OTP. Please try again.');
        this.otpSent = false;
      }
    );
  }

  confirmOtp(): void {
    const enteredOtp = this.otp.join('');
    if (enteredOtp.length < 4) {
      alert('Please enter a valid 4-digit OTP.');
      return;
    }

    this.userService.verifyOtp(this.email, enteredOtp).subscribe(
      () => {
        // alert('OTP Verified! Redirecting...');
        this.router.navigate(['/auth/recover-password'], { queryParams: { email: this.email } });
      },
      (error) => {
        console.error('Invalid OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    );
  }
}

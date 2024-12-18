import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit{
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  minutes: number = 2;
  seconds: number = 0;
  interval: any;

  ngOnInit(): void {
    this.startTimer();
  }
  onInputChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < this.otpInputs.length - 1) {
      const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
      nextInput.focus();
    }
  }
  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.interval);
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }
}

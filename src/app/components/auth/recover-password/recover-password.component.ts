import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  recoverForm!: FormGroup;
  email: string = '';
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || 'user@example.com';
    });
    this.recoverForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatch });
  }

  // Custom validator to check if passwords match
  passwordsMatch(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Handle form submission
  changePassword(): void {
    if (this.recoverForm.invalid) {
      return;
    }
    this.isLoading = true;
    const { password } = this.recoverForm.value;

    this.userService.resetPassword(this.email, password).subscribe(
      () => {
        // alert('Password changed successfully! Redirecting...');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to change password. Please try again.');
        this.isLoading = false;
      }
    );
  }
}

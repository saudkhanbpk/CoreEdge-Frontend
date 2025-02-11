import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent {
  isSubmitting: boolean = false;
  formData = {
    businessName: '',
    businessType: '',
    contactNumber: '',
    city: '',
    state: '',
    country: '',
    streetAddress: '',
    logoUrl: ''
  };

  userData: any = {};
  selectedFile: File | null = null;

  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['userData']) {
      this.userData = navigation.extras.state['userData'];
    } else {
      console.warn('No user data received, redirecting to signup');
      this.router.navigate(['/auth/signup']);
    }
  }

  // Handle File Selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.logoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit Form with API Call
  onSubmit() {
    if (!this.selectedFile) {
      alert('Please upload a business logo.');
      return;
    }
    this.isSubmitting = true;

    let address = {
      city: this.formData.city,
      state: this.formData.state,
      country: this.formData.country,
      streetAddress: this.formData.streetAddress
    };

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', this.userData.fullName);
    formDataToSend.append('email', this.userData.email);
    formDataToSend.append('password', this.userData.password);
    formDataToSend.append('role', this.userData.role);
    formDataToSend.append('businessName', this.formData.businessName);
    formDataToSend.append('businessType', this.formData.businessType);
    formDataToSend.append('contactNumber', this.formData.contactNumber);
    formDataToSend.append('address', JSON.stringify(address));
    formDataToSend.append('logo', this.selectedFile);

    this.userService.signup(formDataToSend).subscribe(
      (response: any) => {
        this.router.navigate(['/auth/login']);
        this.isSubmitting = false;
      },
      (error: any) => {
        console.error('Signup error:', error);
        this.isSubmitting = false;
      }
    );
  }
}

// }

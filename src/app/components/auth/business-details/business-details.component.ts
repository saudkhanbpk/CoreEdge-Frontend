import { Component } from '@angular/core';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent {
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.logoUrl = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Form Data:', this.formData); 
  }
}

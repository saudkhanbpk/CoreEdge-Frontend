import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.css']
})
export class VendorsFormComponent {
  vendorForm: FormGroup;
  isEdit: boolean = false; 
  
  uploadedImageUrl: any;

  constructor(private fb: FormBuilder) {
    this.vendorForm = this.fb.group({
      id: [{ value: '', disabled: true }], 
      name: ['', [Validators.required, Validators.maxLength(100)]],
      contactPerson: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-+\s()]*$/)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      category: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['Active', [Validators.required]], 
      dateJoined: [this.getCurrentDate(), [Validators.required]],
      website: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\d-]+\.){1,}[\w]{2,}(\/.*)?$/)]],
      uploadedImageUrl:['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.uploadedImageUrl = imageUrl; // Update the local property to show the preview
        // Update the form control with the uploaded image URL
        this.vendorForm.patchValue({
          uploadedImageUrl: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  private getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  saveVendor(): void {
   console.log(this.vendorForm.value)
  }

  cancel(): void {
    // Functionality to handle cancel action can be added here
  }
}

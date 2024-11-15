import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { VendorsService } from 'src/app/services/vendors.service'; // Ensure this is the correct path
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.css']
})
export class VendorsFormComponent {
  vendorForm: FormGroup;
  isEdit: boolean = false;
  user: any;
  selectedFile: File | null = null; // For handling file upload
  imageUrl: string = ''; // Define uploadedImageUrl to avoid the error
  roleData: any; // Added roleData declaration

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private vendorService: VendorsService,
    private router: Router // Inject the router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { vendorData
      : any };
    console.log(state);
    
    if (state && state.vendorData
    ) {
      this.roleData = state.vendorData
      ;  // Populate the form with the role data
    } else if (history.state && history.state.vendorData
    ) {
      // Fallback for browser navigation or other cases
      this.roleData = history.state.vendorData;
    } 

    this.user = this.authService.getUserData();

    // Initialize the form group with validation rules
    this.vendorForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      contactPerson: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-+\s()]*$/)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      status: ['Active', [Validators.required]],
      dateJoined: [this.getCurrentDate(), [Validators.required]],
      website: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\d-]+\.){1,}[\w]{2,}(\/.*)?$/)]],
      imageUrl: [''] // Field for storing uploaded image URL
    });

    // If this is an edit form, populate the form values
    if (this.roleData) {
      this.isEdit = true;
      this.vendorForm.patchValue(this.roleData);      
      this.imageUrl= this.roleData.imageUrl// Populate form if roleData exists
    }
  }

  // File selection handler
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store selected file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the uploaded image URL
        this.vendorForm.patchValue({
          imageUrl: this.imageUrl // Update form with the image URL
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Helper method to get the current date
  private getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Save or update vendor data
  saveVendor(): void {
    this.vendorForm.value.user = this.user.id; // Assign logged-in user ID

    const fileToUpload = this.selectedFile || undefined; // Convert null to undefined

    if (this.isEdit) {
      // Update existing vendor      
      this.vendorService.updateVendor(this.vendorForm.getRawValue().id, this.vendorForm.value, fileToUpload)
        .subscribe(
          (vendor: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Vendor Updated',
              text: `The vendor "${vendor.name}" has been updated successfully!`,
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/business-admin/vendors/vendors-table']);
              }
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while updating the vendor. Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        );
    } else {
      // Create new vendor
      const formData = new FormData();
      formData.append('vendor', JSON.stringify(this.vendorForm.value)); // Append vendor data as JSON
      if (fileToUpload) {
        formData.append('file', fileToUpload); // Append selected file if exists
      }

      this.vendorService.createVendor(formData)
        .subscribe(
          (vendor: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Vendor Added',
              text: `The vendor "${vendor.name}" has been added successfully!`,
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/business-admin/vendors/vendors-table']);
              }
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while adding the vendor. Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        );
    }
  }

  // Cancel action (optional)
  cancel(): void {
    // Define what happens when the user clicks cancel
  }
}

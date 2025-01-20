import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-contracts-form',
  templateUrl: './contracts-form.component.html',
  styleUrls: ['./contracts-form.component.css']
})
export class ContractsFormComponent {
  user: any;
  vendors: any[] = [];
  selectedVendor: any = null;
  referenceNo = '';
  openDate = '';
  closeDate = '';

  constructor(
    private authService: AuthService,
    private vendorsService: VendorsService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    console.log('User:', this.user);
    this.loadVendors();
  }

  private loadVendors(): void {
    this.vendorsService.findAll().subscribe({
      next: (response) => (this.vendors = response),
      error: (err) => console.error('Error fetching vendors:', err)
    });
  }

  onVendorChange(event: any): void {
    const vendorId = event.target.value
    this.selectedVendor = this.vendors.find((vendor) => vendor.id == vendorId) || null;
  }

  onSubmit(): void {
    const formData = {
      userId: this.user?.id,
      selectedVendor: this.selectedVendor,
      referenceNo: this.referenceNo,
      openDate: this.openDate,
      closeDate: this.closeDate
    };

    console.log('Form Data:', formData);
  }
}

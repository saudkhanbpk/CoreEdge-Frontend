import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from 'src/app/models/vendor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hardware-request',
  templateUrl: './view-hardware-request.component.html',
  styleUrls: ['./view-hardware-request.component.css']
})
export class ViewHardwareRequestComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Dialog data:', this.data); // Access the passed item here
  }
  isLoading: boolean = false; 
  isunavailable: boolean = false;
  vendors: any[] = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' },
    { id: 3, name: 'Vendor C' },
  ];
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'asadali3@company.com',
    },
  ];
  

  selectVendor() {
    const vendorOptions = this.vendors.reduce((acc, vendor) => {
      acc[vendor.id] = vendor.name;
      return acc;
    }, {} as Record<number, string>); 

    Swal.fire({
      title: 'Select a Vendor',
      input: 'select',
      inputOptions: vendorOptions,
      inputPlaceholder: 'Select a vendor',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedVendor = this.vendors.find(v => v.id === +result.value);
        if (selectedVendor) {
          Swal.fire('Request Sent!', `Your request has been sent to ${selectedVendor.name}.`, 'success');
        }
      }
    });
  }
}
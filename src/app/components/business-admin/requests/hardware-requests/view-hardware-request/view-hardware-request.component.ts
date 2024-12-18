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
      vendorname:'Saad Khan',
      vendorEmail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Hamza Khan',
      vendorEmail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Asad Ali',
      vendorEmail: 'asadali3@company.com',
    },
  ];
  
}
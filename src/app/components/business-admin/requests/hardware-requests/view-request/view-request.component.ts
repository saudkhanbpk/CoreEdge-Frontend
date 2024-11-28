import { Component } from '@angular/core';
import Swal from 'sweetalert2';
interface Vendor {
  id: number;
  name: string;
}

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent {
  isLoading: boolean = false; 
  isunavailable: boolean = false;
  vendors: Vendor[] = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' },
    { id: 3, name: 'Vendor C' },
  ];
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:5,
      price:'272',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:8,
      price:'272',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:3,
      price:'272',
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

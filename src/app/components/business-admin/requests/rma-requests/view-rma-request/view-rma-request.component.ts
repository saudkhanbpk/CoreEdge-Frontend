import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-rma-request',
  templateUrl: './view-rma-request.component.html',
  styleUrls: ['./view-rma-request.component.css']
})
export class ViewRmaRequestComponent {
  isLoading: boolean = false; 
  isunavailable: boolean = false;
  vendors: any[] = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' },
    { id: 3, name: 'Vendor C' },
  ];
  request = [
    {
      no: "01",
      itemName: "Desktop Monitor",
      orderQty: 3,
      receivedQty: 2,
      broken: 0,
      wrongItem: 0,
    },
    {
      no: "02",
      itemName: "Logitech Keyboard",
      orderQty: 15,
      receivedQty: 12,
      broken: 4,
      wrongItem: 2,
    },
    {
      no: "03",
      itemName: "Logitech Keyboard",
      orderQty: 1,
      receivedQty: 1,
      broken: 0,
      wrongItem: 0,
    },
    {
      no: "04",
      itemName: "Logitech Keyboard",
      orderQty: 1,
      receivedQty: 1,
      broken: 0,
      wrongItem: 0,
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
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
  checkAvailability() {
    this.isLoading = true; 
  
    setTimeout(() => {
      this.isLoading = false; 
  
      Swal.fire({
        title: 'Hardware Available!',
        text: 'Do you want to approve or reject the request?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Approve Request',
        cancelButtonText: 'Reject Request',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Approved!', 'The request has been approved.', 'success');
        } else if (result.isDismissed) {
          Swal.fire({
            title: 'Reason for Rejection',
            input: 'textarea',
            inputPlaceholder: 'Enter the reason for rejection...',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            preConfirm: (reason) => {
              if (!reason) {
                Swal.showValidationMessage('Please enter a reason for rejection');
              }
            }
          }).then((reasonResult) => {
            if (reasonResult.isConfirmed) {
              Swal.fire('Rejected!', `You have rejected the request for the following reason: ${reasonResult.value}`, 'error');
            }
          });
        }
      });
    }, 2000);
  }
  checkunAvailability() {
    this.isunavailable = true; 
  
    setTimeout(() => {
      this.isunavailable = false;
      Swal.fire({
        title: 'Hardware Unavailable!',
        text: 'Do you want to send a request to a vendor for the hardware?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // Immediately show confirmation that the request has been sent
          Swal.fire({
            title: 'Request Sent!',
            text: 'Your request has been sent to the vendor.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
        }
      });
    }, 2000);
  }
  

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

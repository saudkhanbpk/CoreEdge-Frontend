import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vendor } from 'src/app/models/vendor.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hardware-request',
  templateUrl: './view-hardware-request.component.html',
  styleUrls: ['./view-hardware-request.component.css']
})
export class ViewHardwareRequestComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ViewHardwareRequestComponent>, private orderService:RequestService, private sharedService: SharedService, private authService: AuthService) {
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

 // Method to handle approval or rejection
 approve(item: any, status: 'Approved' | 'Rejected'): void {
  // Prepare the payload for updating status
  const payload = {
    products: item.availableProducts.map((product: any) => ({
      product: product.product,
      status: status
    }))
  };

  // Call the service to update the status
  this.orderService.updateProductStatus(item.id, payload.products).subscribe(
    (response: any) => {
      console.log(`Request ${status} successfully`, response);

      // Reload data and refresh the view
      const user = this.authService.getUserData();
      if (user) {
        this.sharedService.reloadData(user.id).subscribe((data) => {
          if (data) {
            this.dialogRef.close('refresh');
          }
        });
      } else {
        this.dialogRef.close('refresh');
      }
    },
    (error: any) => {
      console.error(`Error updating request to ${status}:`, error);
    }
  );
}

  
}
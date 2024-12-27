import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { ViewHardwareRequestComponent } from '../../requests/hardware-requests/view-hardware-request/view-hardware-request.component';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-purchase-request',
  templateUrl: './view-purchase-request.component.html',
  styleUrls: ['./view-purchase-request.component.css']
})
export class ViewPurchaseRequestComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewHardwareRequestComponent>, private orderService:RequestService, private sharedService: SharedService, private authService: AuthService) {
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
      vendorname:'Jimmy Anderson',
      vendoremail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Jimmy Anderson',
      vendoremail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Jimmy Anderson',
      vendoremail: 'asadali3@company.com',
    },
  ];
  
  approve(item: any, status: 'Approved' | 'Rejected'): void {
    // Confirmation Modal
    Swal.fire({
      title: `Are you sure you want to ${status.toLowerCase()} this item?`,
      text: `This item will be marked as ${status.toLowerCase()}.`,
      icon: status === 'Approved' ? 'success' : 'warning',
      showCancelButton: true,
      confirmButtonColor: status === 'Approved' ? '#28a745' : '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: `Yes, ${status.toLowerCase()} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Prepare the payload
        const payload = {
          products: item.unavailableProducts.map((product: any) => ({
            product: product.product,
            status: status,
          })),
        };
  
        // Call the service to update the product status
        this.orderService.updateunavailableProductStatus(item.id, payload.products).subscribe(
          (response: any) => {
            const user = this.authService.getUserData();
            if (user) {
              this.sharedService.reloadData(user.id).subscribe((data) => {
                if (data) {
                  this.dialogRef.close('refresh');
                  Swal.fire(
                    `${status}!`,
                    `The item has been successfully ${status.toLowerCase()}ed.`,
                    'success'
                  );
                }
              });
            } else {
              this.dialogRef.close('refresh');
              Swal.fire(
                `${status}!`,
                `The item has been successfully ${status.toLowerCase()}ed.`,
                'success'
              );
            }
          },
          (error: any) => {
            console.error(`Error updating request to ${status}:`, error);
            Swal.fire(
              'Error',
              `There was an error while trying to ${status.toLowerCase()} the item.`,
              'error'
            );
          }
        );
      }
    });
  }


}

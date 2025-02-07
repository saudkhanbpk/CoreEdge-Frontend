import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2pdf from 'html2pdf.js';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css'],
})
export class ViewPurchaseOrderComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewPurchaseOrderComponent>,private authService: AuthService ,private purchaseOrderService: PurchaseOrderService) {
    console.log('Dialog data:', this.data); // Access the passed item here
  }

  downloadPDF(): void {
    const containerElement = this.container.nativeElement;

    if (!containerElement) {
      console.error('Container element not found');
      return;
    }


    const originalStyle = {
      maxHeight: containerElement.style.maxHeight,
      overflow: containerElement.style.overflow,
    };


    containerElement.style.maxHeight = 'none';
    containerElement.style.height = 'auto';
    containerElement.style.overflow = 'visible';


    const options = {
      margin: [10, 10, 10, 10],
      filename: 'Purchase_Order.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };


    html2pdf()
      .set(options)
      .from(containerElement)
      .save()
      .then(() => {
        containerElement.style.maxHeight = originalStyle.maxHeight;
        containerElement.style.overflow = originalStyle.overflow;
      })
      .catch((error: any) => {
        console.error('Error generating PDF:', error);
        containerElement.style.maxHeight = originalStyle.maxHeight;
        containerElement.style.overflow = originalStyle.overflow;
      });
  }


   mergeSelectedOrders(): void {
    console.log('Selected Orders:', this.data);
    
      const selectedOrders = this.data;
  
      if (selectedOrders.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Orders Selected',
          text: 'Please select at least one order to merge.',
        });
        return;
      }
  
      const orderedProducts = (Array.isArray(selectedOrders) ? selectedOrders : [])
  .flatMap(order => order.unavailableProducts?.filter((item:any) => item.poStatus === 'Ordered') || []);

      
      if (orderedProducts.length > 0) {
        const orderedProductIds = orderedProducts.map((item: any) => item.product.id).join(', ');
        Swal.fire({
          icon: 'warning',
          title: 'Some Products Already Ordered',
          text: `The following products have already been ordered: ${orderedProductIds}. They will not be included in the merge.`,
        });
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to Order the selected orders?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Order them!',
        }).then((result) => {
          if (result.isConfirmed) {
            const mergedUnavailableProducts = (Array.isArray(selectedOrders) ? selectedOrders : [])
            .reduce((acc, order: any) => {
              const unavailableProducts = Array.isArray(order.unavailableProducts) ? order.unavailableProducts : [];
              const filteredProducts = unavailableProducts
                .filter((item: any) => item.poStatus !== 'Ordered')
                .map((item: any) => ({
                  product: item.product,
                  quantity: item.quantity,
                  status: 'Pending',
                  price: item.product.price * item.quantity,
                }));
                
              return acc.concat(filteredProducts);
            }, []);
          
          
  
            const totalPrice = mergedUnavailableProducts.reduce((sum: number, item: any) => sum + item.price, 0);
  
            const orderIds = selectedOrders.id;
  
            const vendorDetails = selectedOrders[0]?.unavailableProducts[0]?.product?.vendor || {};
            const barcode = `BARCODE-${Date.now()}`;
            const user = this.authService.getUserData();
  
            const newOrder = {
              barcode,
              users: [user.id],
              vendor: [vendorDetails.id],
              products: mergedUnavailableProducts,
              totalPrice,
              description: 'Order from multiple orders',
              orderIds, 
            };
  
            this.purchaseOrderService.create(newOrder).subscribe({
              next: (response) => {
                console.log('Order successfully created:', response);
                Swal.fire(
                  'Sent!',
                  'The selected Purchase Orders have been successfully sent to the vendor.',
                  'success'
                );
                this.dialogRef.close('refresh');
              },
              error: (error) => {
                console.error('Error while creating order:', error);
                Swal.fire(
                  'Error',
                  'An error occurred while sending the orders.',
                  'error'
                );
              },
            });
          }
  
        });
      }
    }
}

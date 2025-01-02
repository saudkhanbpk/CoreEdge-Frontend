import { Component, ElementRef, Inject, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import html2pdf from 'html2pdf.js';
import { VendorUpdatePriceComponent } from '../vendor-update-price/vendor-update-price.component';
import Swal from 'sweetalert2';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-vendor-view-purchase-order',
  templateUrl: './vendor-view-purchase-order.component.html',
  styleUrls: ['./vendor-view-purchase-order.component.css']
})
export class VendorViewPurchaseOrderComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;
    readonly dialog = inject(MatDialog)
  
 constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<VendorViewPurchaseOrderComponent>, purchaseOrderService: PurchaseOrderService) {
    console.log('Dialog data:', this.data); // Access the passed item here
  }

  ngAfterViewInit(): void {
    // Generate the barcode after the view initializes
    if (this.data && this.data.barcode) {
      // Remove the 'BARCODE-' prefix
      const numericBarcode = this.data.barcode.replace('BARCODE-', '');

      JsBarcode('#barcodeCanvas', numericBarcode, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 60,
        displayValue: true, // Show the barcode value below the barcode
      });
    }
  }

  printBarcode(): void {
    const canvas = document.getElementById('barcodeCanvas') as HTMLCanvasElement;
    if (canvas) {
      const newWindow = window.open('', '_blank', 'width=400,height=300');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Print Barcode</title>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }
                canvas {
                  display: block;
                }
              </style>
            </head>
            <body>
              <canvas></canvas>
            </body>
          </html>
        `);
        const newCanvas = newWindow.document.querySelector('canvas') as HTMLCanvasElement;
        if (newCanvas) {
          const context = newCanvas.getContext('2d');
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.height;
          if (context) {
            context.drawImage(canvas, 0, 0);
          }
        }
        newWindow.print();
        newWindow.close();
      }
    }
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

  openDialog(){
    this.dialog.open(VendorUpdatePriceComponent, {
      maxWidth:'500px',
      width:'100%'
    })
  }


  
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
    
        //   // Call the service to update the product status
        //   this.purchaseOrderService.updateunavailableProductStatus(item.id, payload.products).subscribe(
        //     (response: any) => {
        //       const user = this.authService.getUserData();
        //       if (user) {
        //         this.purchaseOrderService.reloadData(user.id).subscribe((data) => {
        //           if (data) {
        //             this.dialogRef.close('refresh');
        //             Swal.fire(
        //               `${status}!`,
        //               `The item has been successfully ${status.toLowerCase()}ed.`,
        //               'success'
        //             );
        //           }
        //         });
        //       } else {
        //         this.dialogRef.close('refresh');
        //         Swal.fire(
        //           `${status}!`,
        //           `The item has been successfully ${status.toLowerCase()}ed.`,
        //           'success'
        //         );
        //       }
        //     },
        //     (error: any) => {
        //       console.error(`Error updating request to ${status}:`, error);
        //       Swal.fire(
        //         'Error',
        //         `There was an error while trying to ${status.toLowerCase()} the item.`,
        //         'error'
        //       );
        //     }
        //   );
        // 
        }
      });
    }
}

import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2pdf from 'html2pdf.js';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css'],
})
export class ViewPurchaseOrderComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;
 constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ViewPurchaseOrderComponent>, private orderService:RequestService, private sharedService: SharedService, private authService: AuthService) {
    console.log('Dialog data:', this.data); // Access the passed item here
  }  downloadPDF(): void {
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
}

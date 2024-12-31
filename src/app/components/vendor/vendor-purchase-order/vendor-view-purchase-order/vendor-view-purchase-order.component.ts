import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2pdf from 'html2pdf.js';
import { VendorUpdatePriceComponent } from '../vendor-update-price/vendor-update-price.component';

@Component({
  selector: 'app-vendor-view-purchase-order',
  templateUrl: './vendor-view-purchase-order.component.html',
  styleUrls: ['./vendor-view-purchase-order.component.css']
})
export class VendorViewPurchaseOrderComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;
    readonly dialog = inject(MatDialog)
  
  constructor(){}

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
}

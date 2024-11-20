import { Component, ElementRef, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-view-purchase-order',
  templateUrl: './view-purchase-order.component.html',
  styleUrls: ['./view-purchase-order.component.css'],
})
export class ViewPurchaseOrderComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;

  downloadPDF(): void {
    const containerElement = this.container.nativeElement;

    if (!containerElement) {
      console.error('Container element not found');
      return;
    }

    // Store original styles
    const originalStyle = {
      maxHeight: containerElement.style.maxHeight,
      overflow: containerElement.style.overflow,
    };

    // Apply temporary styles
    containerElement.style.maxHeight = 'none';
    containerElement.style.height = 'auto';
    containerElement.style.overflow = 'visible';

    // PDF generation options
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

    // Generate PDF
    html2pdf()
      .set(options)
      .from(containerElement)
      .save()
      .then(() => {
        // Revert styles back to original
        containerElement.style.maxHeight = originalStyle.maxHeight;
        containerElement.style.overflow = originalStyle.overflow;
      })
      .catch((error: any) => {
        console.error('Error generating PDF:', error);
        // Revert styles even on error
        containerElement.style.maxHeight = originalStyle.maxHeight;
        containerElement.style.overflow = originalStyle.overflow;
      });
  }
}

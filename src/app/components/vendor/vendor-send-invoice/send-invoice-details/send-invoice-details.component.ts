import { Component } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-send-invoice-details',
  templateUrl: './send-invoice-details.component.html',
  styleUrls: ['./send-invoice-details.component.css']
})
export class SendInvoiceDetailsComponent {
  showDisputeOptions: boolean = false;
  masterCheckboxChecked: boolean = false;
  isLoading: boolean = false; 
  isPaid: boolean = false;    
  showDisputeSection: boolean = false; 
  disputeSubmitted: boolean = false; 
  uploadedImageUrl: string = '';
  invoiceData:any

  constructor(public invoiceService:InvoiceService){
  this.invoiceService.currentinvoicedata.subscribe((res:any)=>{
     console.log("sta", res)
     this.invoiceData = res
     this.purchasedItems = res?.products

   })
  }

  purchasedItems:any[] =[]
  openDispute(): void {
    this.showDisputeOptions = true;
  }
  cancelDispute(): void {
    this.showDisputeOptions = false;
  }
  get subtotal() {
    return this.purchasedItems.reduce((sum, item) => sum + item.price, 0);
  }
  // Toggle all checkboxes
  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.purchasedItems.forEach(item => {
      item.checked = isChecked;
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}

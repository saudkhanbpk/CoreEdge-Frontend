import { Component } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  showDisputeOptions: boolean = false;
  masterCheckboxChecked: boolean = false;
  isLoading: boolean = false; 
  isPaid: boolean = false;    
  showDisputeSection: boolean = false; 
  disputeSubmitted: boolean = false; 
  uploadedImageUrl: string = '';
  invoiceData:any;
  purchasedItems:any[]=[]

  constructor(private invoiceService:InvoiceService){
    this.invoiceService.currentinvoicedata.subscribe((res:any)=>{
      console.log("sta", res)
      this.invoiceData = res
      this.purchasedItems = res?.products
 
    })
  }

  // purchasedItems = [
  //   { name: 'Desktop Monitor', quantity: 1, unitPrice: 150, price: 150, checked: false },
  // ]
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

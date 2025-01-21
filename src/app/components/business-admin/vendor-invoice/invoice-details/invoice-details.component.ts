import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

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
  invoiceData: any;
  purchasedItems: any[] = []
  file: File | null = null;


  constructor(private invoiceService: InvoiceService, private router: Router

  ) { }

  ngOnInit() {
    this.invoiceService.currentInvoiceData.pipe(take(1)).subscribe((res: any) => {
      if (res && Object.keys(res).length > 0) {
        this.invoiceData = res;
        this.purchasedItems = res?.products || [];
      } else {
        this.router.navigate(['/business-admin/vendor-invoice/invoice-table']);
      }
    });
  }

  openDispute(): void {
    this.showDisputeOptions = true;
  }
  cancelDispute(): void {
    this.showDisputeOptions = false;
  }
  get subtotal() {
    return this.purchasedItems.reduce((sum, item) => sum + item.price, 0);
  }
  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.purchasedItems.forEach(item => {
      item.checked = isChecked;
    });
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.file = selectedFile;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result;
      };

      reader.readAsDataURL(selectedFile);
    } else {
      console.log('No file selected.');
      this.file = null;
    }
  }

  clearInvoice(): void {
    if (!this.invoiceData) {
      Swal.fire({
        icon: 'warning',
        title: 'No Invoice Selected',
        text: 'Please select an invoice to clear.',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to clear this invoice? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        if (this.file) {
          formData.append('file', this.file, this.file.name);
        }

        const invoiceData = {
          adminStatus: 'Paid',
        };
        formData.append('invoiceData', JSON.stringify(invoiceData));

        for (const pair of (formData as any).entries()) {
          console.log(pair[0], pair[1]);
        }

        this.invoiceService.updateInvoice(this.invoiceData.id, formData).subscribe({
          next: () => {
            this.file = null;
            this.uploadedImageUrl = '';
            this.invoiceData = null;

            Swal.fire('Cleared!', 'The invoice has been successfully cleared.', 'success')
              .then(() => {
                this.router.navigate(['/business-admin/vendor-invoice/invoice-table']);
              });
          },
          error: (err) => {
            Swal.fire('Error!', 'An error occurred while clearing the invoice. Please try again.', 'error');
            console.error('Error clearing invoice:', err);
          },
        });
      }
    });
  }


}

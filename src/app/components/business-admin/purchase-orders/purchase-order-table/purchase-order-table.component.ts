import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseOrderComponent } from '../view-purchase-order/view-purchase-order.component';
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.css']
})
export class PurchaseOrderTableComponent {
  currentPage = 1;
  itemsPerPage = 10;
  data: any;
  originalData: any[] = [];
  showMergeOptions: boolean = false;
  masterCheckboxChecked: boolean = false;
  expandedIndex: number | null = null;
  uniqueVendors: { id: number; name: string }[] = [];
  readonly dialog = inject(MatDialog)
  constructor(private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService) {
  }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const vendorsMap: { [key: number]: string } = {};

          const processedOrders = items.map((item) => {
            const approvedProducts = item.unavailableProducts.filter(
              (product: any) => product.status === 'Approved'
            );
            const productsGroupedByVendor = approvedProducts.reduce(
              (acc: any, product: any) => {
                const vendor = product.product.vendor;
                const vendorId = vendor.id;

                if (!acc[vendorId]) {
                  acc[vendorId] = {
                    vendorDetails: vendor,
                    products: [],
                    totalPrice: 0,
                  };

                  vendorsMap[vendorId] = vendor.name;
                }

                acc[vendorId].products.push(product);
                acc[vendorId].totalPrice += parseFloat(product.product.price) * product.quantity;
                return acc;
              },
              {}
            );

            return Object.keys(productsGroupedByVendor).map((vendorId) => ({
              ...item,
              unavailableProducts: productsGroupedByVendor[vendorId].products,
              totalPrice: productsGroupedByVendor[vendorId].totalPrice,
            }));
          });

          this.data = processedOrders.flat();

          this.uniqueVendors = Object.entries(vendorsMap).map(([id, name]) => ({
            id: +id,
            name,
          }));
          this.originalData = [...this.data];

          console.log('Unique Vendors: ', this.uniqueVendors);
          console.log('Processed Orders: ', this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }






  // data = [
  //   {
  //     purchaseorderno: '2982-XJ82-92',
  //     employeename: 'Saad Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     requesteddate :'October 3rd, 2024',
  //     receivedddate :'October 5th, 2024',
  //     totalamount :'3500',
  //     address:'Las Vegas',
  //     status:'Ordered',
  //     checked:false,
  //     productdetails: [
  //       {
  //         name: 'Items Requested', items: [
  //           { itemname: 'Monitor', price: 5 },
  //           { itemname: 'Keyboard', price: 15 },
  //           { itemname: 'Mouse', price: 25 },
  //           { itemname: 'RAM', price: 35 },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     purchaseorderno: '2982-XJ82-92',
  //     employeename: 'Ihtizaz Ahmad',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     requesteddate :'October 3rd, 2024',
  //     receivedddate :'October 5th, 2024',
  //     totalamount :'3500',
  //     address:'Las Vegas',
  //     status:'Pending',
  //     checked:false,
  //     productdetails: [
  //       {
  //         name: 'Items Requested', items: [
  //           { itemname: 'Monitor', price: 5 },
  //           { itemname: 'Keyboard', price: 15 },
  //           { itemname: 'Mouse', price: 25 },
  //           { itemname: 'RAM', price: 35 },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     purchaseorderno: '2982-XJ82-92',
  //     employeename: 'Aamir Shehzad',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     requesteddate :'October 3rd, 2024',
  //     receivedddate :'October 5th, 2024',
  //     totalamount :'3500',
  //     address:'Las Vegas',
  //     status:'Rejected',
  //     checked:false,
  //     productdetails: [
  //       {
  //         name: 'Items Requested', items: [
  //           { itemname: 'Monitor', price: 5 },
  //           { itemname: 'Keyboard', price: 15 },
  //           { itemname: 'Mouse', price: 25 },
  //           { itemname: 'RAM', price: 35 },
  //         ]
  //       }
  //     ]
  //   },
  // ];
  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.paginatedData.forEach((item: any) => {
      item.checked = isChecked; // Update the checked state for all items
    });

  }
  mergeSelectedOrders(): void {
    const selectedOrders = this.paginatedData.filter((item: any) => item.checked); // Get all checked items

    if (selectedOrders.length === 0) {
      console.warn('No orders selected for merging.');
      return;
    }

    // Combine unavailableProducts from all selected orders
    const mergedUnavailableProducts = selectedOrders.flatMap((order: any) => order.unavailableProducts);

    // Extract vendor details from the first selected order (assuming they share the same vendor)
    const vendorDetails = selectedOrders[0]?.unavailableProducts[0]?.product?.vendor || {};

    // Generate a unique barcode for the new order (example: using timestamp)
    const barcode = `BARCODE-${Date.now()}`;

    // Create the new merged order
    const newOrder = {
      id: `NEW-ORDER-${Date.now()}`, // Unique ID for the merged order
      mergedProducts: mergedUnavailableProducts,
      vendor: vendorDetails,
      barcode,
    };

    console.log('New Merged Order:', newOrder);

    // Optionally, add the new order to your data or perform additional actions
    this.paginatedData.push(newOrder);
  }


  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ViewPurchaseOrderComponent, {
      data: item,
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  onVendorChange(event: Event): void {
    const selectedVendorId = +(event.target as HTMLSelectElement).value; // Get the selected vendor ID

    if (selectedVendorId === 0) {
      // Show all data if "All" is selected
      this.data = [...this.originalData]; // Reset to the original unfiltered data
      console.log('All Data:', this.data);
    } else if (selectedVendorId) {
      // Filter the data from the originalData
      this.data = this.originalData.filter((order: any) =>
        order.unavailableProducts.some(
          (product: any) => product.product.vendor.id === selectedVendorId
        )
      );

      // Filter out other vendors from each order's unavailableProducts
      this.data.forEach((order: any) => {
        order.unavailableProducts = order.unavailableProducts.filter(
          (product: any) => product.product.vendor.id === selectedVendorId
        );
      });

      console.log('Filtered Data:', this.data);
    } else {
      console.error('No vendor selected');
    }
  }



  get totalPages() {
    return Math.ceil((this.data?.length || 0) / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isNextPageAvailable() {
    return this.currentPage < this.totalPages;
  }

  isPreviousPageAvailable() {
    return this.currentPage > 1;
  }


  // openDialog(item:any){
  //   this.dialog.open(ViewPurchaseOrderComponent, {
  //     data:item,
  //     width:'60%'
  //   })
  // }
}

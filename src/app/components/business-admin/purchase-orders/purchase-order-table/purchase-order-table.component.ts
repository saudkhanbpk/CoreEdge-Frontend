import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseOrderComponent } from '../view-purchase-order/view-purchase-order.component';
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.css']
})
export class PurchaseOrderTableComponent {
  loading:boolean = false
  currentPage = 1;
  itemsPerPage = 10;
  data: any;
  originalData: any[] = [];
  showMergeOptions: boolean = false;
  masterCheckboxChecked: boolean = false;
  expandedIndex: number | null = null;
  filteredData:any[]=[];
  selectedSortOption:any='';
  uniqueVendors: { id: number; name: string }[] = [];
  readonly dialog = inject(MatDialog)
  constructor(private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService,
    private purchaseOrderService: PurchaseOrderService
  ) {
  }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      console.log("ihtizaz console is here : ", user);
      
      this.loading = true
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
          this.filteredData = [...this.data]
          if(this.filteredData){
            this.loading = false
          }
          console.log('Processed Orders: ', this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  
  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.unavailableProducts[0]?.product?.vendor?.name.localeCompare(b.unavailableProducts[0]?.product?.vendor?.name)
      );

    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }

  onInputChange(event: any) {
    const searchTerm = event.target.value.trim(); // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.data.filter((item: any) =>
        item?.employees[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item?.employees[0]?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item?.unavailableProducts[0]?.product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.data] // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }

  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.paginatedData.forEach((item: any) => {
      item.checked = isChecked; // Update the checked state for all items
    });

  }

  mergeSelectedOrders(): void {
    const selectedOrders = this.paginatedData.filter((item: any) => item.checked);

    if (selectedOrders.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Orders Selected',
        text: 'Please select at least one order to merge.',
      });
      return;
    }

    const orderedProducts = selectedOrders.flatMap((order: any) =>
      order.unavailableProducts.filter((item: any) => item.poStatus === 'Ordered')
    );
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
        text: 'Do you want to merge the selected orders?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, merge them!',
      }).then((result) => {
        if (result.isConfirmed) {
          const mergedUnavailableProducts = selectedOrders.flatMap((order: any) =>
            order.unavailableProducts
              .filter((item: any) => item.poStatus !== 'Ordered') 
              .map((item: any) => ({
                product: item.product,
                quantity: item.quantity,
                status: 'Pending',
                price: item.product.price * item.quantity,
              }))
          );

          const totalPrice = mergedUnavailableProducts.reduce((sum: number, item: any) => sum + item.price, 0);

          const orderIds = selectedOrders.map((order: any) => order.id);

          const vendorDetails = selectedOrders[0]?.unavailableProducts[0]?.product?.vendor || {};
          const barcode = `BARCODE-${Date.now()}`;
          const user = this.authService.getUserData();

          const newOrder = {
            barcode,
            users: [user.id],
            vendor: [vendorDetails.id],
            products: mergedUnavailableProducts,
            totalPrice,
            description: 'Merged Order from multiple orders',
            orderIds, 
          };

          this.purchaseOrderService.create(newOrder).subscribe({
            next: (response) => {
              console.log('Order successfully created:', response);
              Swal.fire(
                'Merged and Sent!',
                'The selected Purchase Orders have been successfully merged and sent to the vendor.',
                'success'
              );
              this.ngOnInit();
              this.paginatedData.push(response);
            },
            error: (error) => {
              console.error('Error while creating order:', error);
              Swal.fire(
                'Error',
                'An error occurred while merging and sending the orders.',
                'error'
              );
            },
          });
        }

      });
    }
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
      this.filteredData = [...this.originalData]; // Reset to the original unfiltered data
      console.log('All Data:', this.data);
    } else if (selectedVendorId) {
      // Filter the data from the originalData
      this.filteredData = this.originalData.filter((order: any) =>
        order.unavailableProducts.some(
          (product: any) => product.product.vendor.id === selectedVendorId
        )
      );

      // Filter out other vendors from each order's unavailableProducts
      this.filteredData.forEach((order: any) => {
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
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
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

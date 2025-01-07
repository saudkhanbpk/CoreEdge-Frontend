import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent {
  currentPage = 1;
  itemsPerPage = 10; // Number of orders per page
  expandedIndex: number | null = null;
  data: any;
  constructor(private authService: AuthService,
    private sharedService: SharedService,) { }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.sharedService.getPurchaseOrders(user.id).subscribe(
        (orders: any[]) => {
          // const filteredOrders = orders.filter(
          //   (order) =>
          //     order.availableProducts &&
          //     order.availableProducts.length > 0 &&
          //     order.availableProducts[0]?.status === 'Approved'
          // );
          console.log("orders : ", orders);

          this.data = orders;
          console.log('Filtered Orders:', this.data);
        },
        (error) => {
          console.error('Error fetching vendor orders:', error);
        }
      );
    }
  }

  // data = [
  //   {
  //     name: 'Babar Azam',
  //     email:'babar56@gmail.com',
  //     status:'Paid',
  //     amount:'3000'
  //   },
  //   {
  //     name: 'Virat Kohli',
  //     email:'virat18@gmail.com',
  //     status:'Dispute',
  //     amount:'2500'
  //   },
  //   {
  //     name: 'Rohit Sharma',
  //     email:'rohit32@gmail.com',
  //     status:'Pending',
  //     amount:'1800'
  //   },
  //   {
  //     name: 'Imran Khan',
  //     email:'imrankhan804@gmail.com',
  //     status:'Resolved',
  //     amount:'899'
  //   },
  //   {
  //     name: 'Jimmy Anderson',
  //     email:'jimmy91@gmail.com',
  //     status:'Paid',
  //     amount:'10000'
  //   },
  //   {
  //     name: 'Carlos Brathwate',
  //     email:'carlos6666@gmail.com',
  //     status:'Pending',
  //     amount:'9200'
  //   },
  // ];

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
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
}

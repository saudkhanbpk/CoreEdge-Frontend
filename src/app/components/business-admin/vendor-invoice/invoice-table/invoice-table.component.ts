import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent {
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  data: any[]=[];
  filteredData:any=[];
  vendor:any=[]
  status:any=[];
  selectedvendor:any
  selectedstatus:any;
  selectedSortOption:any='';
  loading:boolean = false;
  user: any;
  constructor(private authService: AuthService,
    private invoiceService: InvoiceService,) { }

      //     this.data = orders;
      //     this.filteredData = this.data
      //     const seenNames = new Set();
      //     this.data.forEach((element:any) => {
      //       const vendor = element.vendor
      //       vendor.map((i:any)=>{
      //           seenNames.add(i.name)
      //           this.vendor.push(i)
      //        })

      //        if (!seenNames.has(element.status)) {
      //         seenNames.add(element.status);
      //         this.status.push(element.status);
      //         }
      //     });
          
      //   },
      //   (error) => {
      //     console.error('Error fetching vendor orders:', error);
      //   }
      // );
    ngOnInit(): void {
      this.user = this.authService.getUserData();
      this.loadInvoices();
    }
  
    loadInvoices(): void {
      this.loading = true
      this.invoiceService.getInvoicesByUserId(this.user.id).subscribe(
        (data: any) => {
              if (data) {
                  this.data = data;
                  this.filteredData = data;
                  if (this.filteredData) {
                    this.loading = false
                  }
                  const seenStatuses = new Set();
                  const seenVendors = new Set();
                  data.forEach(({ adminStatus, vendor }: any) => {
                      if (adminStatus && !seenStatuses.has(adminStatus)) {
                          seenStatuses.add(adminStatus);
                          this.status.push(adminStatus);
                      }
                      if (vendor?.name && !seenVendors.has(vendor.name)) {
                          seenVendors.add(vendor.name);
                          this.vendor.push(vendor.name);
                      }
                  });
  
                  console.log("Unique statuses:", this.status);
                  console.log("Unique vendors:", this.vendor);
              }
          },
          (error: any) => console.error('Error loading invoices', error)
      );
  }
  
  
  onInputChange(event: any) {
    const searchTerm = event.target.value; // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.data.filter((item:any) =>
        item?.vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.vendor?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }else {
      this.filteredData = this.data; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }


  filterData() {  
    this.filteredData = this.data.filter((item:any) => {
      console.log("item" , item)
      console.log("item slected" , this.selectedstatus)

      const matchesVendor = this.selectedvendor === 'all' || item?.vendor?.name == this.selectedvendor;
      const matchesStatus = this.selectedstatus === 'all' || item.adminStatus == this.selectedstatus;
      return matchesVendor && matchesStatus;
    });
  }
  sortData() {
    console.log("this " , this.selectedSortOption)
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a:any, b:any) =>
        a?.vendor[0]?.name.localeCompare(b.vendor[0]?.name)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a:any, b:any) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );

    }
  }
 
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
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
}

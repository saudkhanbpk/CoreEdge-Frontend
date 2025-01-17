
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import { ViewHardwareRequestComponent } from '../view-hardware-request/view-hardware-request.component';

@Component({
  selector: 'app-hardware-requests-table',
  templateUrl: './hardware-requests-table.component.html',
  styleUrls: ['./hardware-requests-table.component.css'],
})
export class HardwareRequestsTableComponent {
  isLoading: boolean[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  data: any[] = [];
  filteredData: any[] = [];
  selectedReviewStatus = '';
  selectedSortOption = '';
  loading: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loading = true
    if (user) {
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          this.data = items;
          const filteredItems = items.filter((item) => item.availableProducts && item.availableProducts.length > 0);
          this.data = filteredItems;
          this.filteredData = [...this.data];
          if(this.filteredData){
            this.loading = false
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ViewHardwareRequestComponent, {
      data: item,
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.ngOnInit();
      }
    });
  }

  filterByStatus() {
    if(this.selectedReviewStatus == 'all'){
      this.filteredData = [...this.data];
    }else{
      this.filteredData = this.selectedReviewStatus
      ? this.data.filter(
          (item) =>
            item.availableProducts[0]?.status === this.selectedReviewStatus
        )
      : [...this.data];
    }
   
  }

  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.employees[0]?.name.localeCompare(b.employees[0]?.name)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (this.selectedSortOption === 'amount') {
      this.filteredData.sort(
        (a, b) => a.amount - b.amount
      );
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
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

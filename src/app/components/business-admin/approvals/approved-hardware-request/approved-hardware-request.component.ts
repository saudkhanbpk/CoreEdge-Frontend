import { Component, inject } from '@angular/core';
import { ViewApprovedHardwareRequestComponent } from '../view-approved-hardware-request/view-approved-hardware-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-approved-hardware-request',
  templateUrl: './approved-hardware-request.component.html',
  styleUrls: ['./approved-hardware-request.component.css']
})
export class ApprovedHardwareRequestComponent {

  isLoading: boolean[] = [];
  isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);

  constructor() {}
  ngOnInit(): void {
    console.log('this is data', this.data);
  }

  data = [
    {
      no: '001',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      description: 'I just need it, my old monitor is broke.',
      status: 'Approved',
      date:'oct 20 , 2024'
    },
    {
      no: '002',
      employeename: 'Ihtizaz Ahmad',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      description: 'I just need it, my old monitor is broke.',
      status: 'Approved',
      date:'oct 20 , 2024'

    },
  ];
  openDialog() {
    const dialogRef = this.dialog.open(ViewApprovedHardwareRequestComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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

import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalsDetailsComponent } from '../approvals-details/approvals-details.component';

@Component({
  selector: 'app-approvals-table',
  templateUrl: './approvals-table.component.html',
  styleUrls: ['./approvals-table.component.css']
})
export class ApprovalsTableComponent {
  isLoading: boolean[] = []; 
  isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10; 
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);

 
  constructor(){}
  ngOnInit(): void {
   console.log("this is data", this.data)
  }
  

  data = [
    {
      no: '001',
      employeename: 'Saad Khan',
      employeeemail:'employeeemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      description:'I just need it, my old monitor is broke.'
    },
  ];

  openDialog() {
    const dialogRef = this.dialog.open(ApprovalsDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
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

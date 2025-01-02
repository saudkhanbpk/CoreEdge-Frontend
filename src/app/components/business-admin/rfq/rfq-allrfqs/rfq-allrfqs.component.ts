import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rfq-allrfqs',
  templateUrl: './rfq-allrfqs.component.html',
  styleUrls: ['./rfq-allrfqs.component.css']
})
export class RfqAllrfqsComponent {

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
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 1',
      owner: 'Phoniex Baker',
      description: 'I just need it, my old monitor is broke.',
      enddate:'24th Oct 2025',
      totalresponses:'18',
      accepted:'10',
      requisitioned:'4',
      rejected:'4',
      status: 'Submitted',
      date:'oct 20 , 2024'
    },
    {
      no: '002',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 2',
      owner: 'John Doe',
      description: 'I just need it, my old monitor is broke.',
      enddate:'24th Oct 2025',
      totalresponses:'18',
      accepted:'10',
      requisitioned:'4',
      rejected:'4',
      status: 'Requisitioned',
      date:'oct 20 , 2024'
    },
    {
      no: '003',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 3',
      owner: 'Edward Kenway',
      description: 'I just need it, my old monitor is broke.',
      enddate:'24th Oct 2025',
      totalresponses:'18',
      accepted:'10',
      requisitioned:'4',
      rejected:'4',
      status: 'Submitted',
      date:'oct 20 , 2024'
    },
    {
      no: '004',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 4',
      owner: 'Dexter Stevens',
      description: 'I just need it, my old monitor is broke.',
      enddate:'24th Oct 2025',
      totalresponses:'18',
      accepted:'10',
      requisitioned:'4',
      rejected:'4',
      status: 'Requisitioned',
      date:'oct 20 , 2024'
    },
  ];

  // openDialog() {
  //   const dialogRef = this.dialog.open(ViewHardwareRequestComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

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

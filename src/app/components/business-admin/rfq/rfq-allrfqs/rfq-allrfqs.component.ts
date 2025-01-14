import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

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
  selectedStatus = '';
  searchTerm: string = '';
  readonly dialog = inject(MatDialog);
  filteredData: any[] = [];
  selectedSortOption = '';

  constructor(private sharedservice: SharedService) { }
  ngOnInit(): void {
    console.log('this is data', this.data);
    this.filteredData = [...this.data];
    this.filteredbysearch()
  }

  filterByStatus() {
    console.log("this is filtered ", this.selectedStatus)
    if (this.selectedStatus == 'all') {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.selectedStatus
        ? this.data.filter(
          (item) =>
            item.status === this.selectedStatus
        )
        : [...this.data];
    }
  }

  filteredbysearch() {
    this.sharedservice.currentSearchTerm.subscribe(term => {
      this.searchTerm = term //this search term get from rfq-main component using sharedservice 
      console.log("this .serfch term", this.searchTerm)
      if (this.searchTerm) {
        this.filteredData = this.data.filter((rfq) =>
          rfq.rfqname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          rfq.referenceno.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          rfq.owner.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }else{
        this.filteredData = [...this.data];
      }
    })
  }
  sortData() {
    console.log("this " , this.selectedSortOption)
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.rfqname.localeCompare(b.rfqname)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    } else if (this.selectedSortOption === 'amount') {
      this.filteredData.sort(
        (a, b) => a.accepted - b.accepted
      );
    }
  }
  data = [
    {
      no: '001',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 1',
      owner: 'Phoniex Baker',
      description: 'I just need it, my old monitor is broke.',
      enddate: '25th Oct 2025',
      totalresponses: '18',
      accepted: '10',
      requisitioned: '4',
      rejected: '4',
      status: 'Submitted',
      date: 'oct 20 , 2024'
    },
    {
      no: '002',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 2',
      owner: 'John Doe',
      description: 'I just need it, my old monitor is broke.',
      enddate: '24th Oct 2025',
      totalresponses: '18',
      accepted: '10',
      requisitioned: '4',
      rejected: '4',
      status: 'Requisitioned',
      date: 'oct 20 , 2024'
    },
    {
      no: '003',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 3',
      owner: 'Edward Kenway',
      description: 'I just need it, my old monitor is broke.',
      enddate: '24th Oct 2025',
      totalresponses: '18',
      accepted: '10',
      requisitioned: '4',
      rejected: '4',
      status: 'Submitted',
      date: 'oct 20 , 2024'
    },
    {
      no: '004',
      referenceno: '2456-33XD-382',
      rfqname: 'RFQ No 4',
      owner: 'Dexter Stevens',
      description: 'I just need it, my old monitor is broke.',
      enddate: '24th Oct 2025',
      totalresponses: '18',
      accepted: '10',
      requisitioned: '4',
      rejected: '4',
      status: 'Requisitioned',
      date: 'oct 20 , 2024'
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
    // Calculate the start index for pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    // Return the paginated data based on the filtered results
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

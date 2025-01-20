import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.css']
})
export class ContractsTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  readonly dialog = inject(MatDialog);
  searchTerm = '';
  filteredData: any[] = [];
  selectedvendor ='';
  selectedstatus ='';
  selectedSortOption='';
  vendors:any[] =[];
  Allstatus:any[]=[]
  ngOnInit(): void {
   this.filteredData = this.data
   this.vendors = this.data.map((i:any)=>{return i.vendor})
   this.Allstatus = this.data.map((i:any)=>{return i.status})
   console.log("vndor" , this.vendors)


  }
  onInputChange(event: any) {
    this.searchTerm = event.target.value; // Update the searchTerm variable
    if (this.searchTerm) {
      this.filteredData = this.data.filter((contract: any) =>
        contract.contractname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.vendor.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  } 
  filterData() {  
    this.filteredData = this.data.filter((item) => {
      const matchesVendor = this.selectedvendor === 'all' || item.vendor === this.selectedvendor;
      const matchesStatus = this.selectedstatus === 'all' || item.status === this.selectedstatus;
      return matchesVendor && matchesStatus;
    });
  }
  sortData() {
    console.log("this " , this.selectedSortOption)
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.contractname.localeCompare(b.contractname)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );

    }
  }
  get totalPages() {
    return Math.ceil(this.data?.length / this.itemsPerPage);
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


  data = [
    {
      no: '001',
      referenceno: '3445-32XHJ-232',
      contractname:'Abc',
      owner:'John Doe',
      vendor:'Alexa Hailey',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'In Draft',
      description:'lorem ipsum dolor'
    },
    {
      no: '002',
      referenceno: '3445-32XHJ-232',
      contractname:'XYZ',
      owner:'John Doe',
      vendor:'Luqman',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'Approved',
      description:'lorem ipsum dolor'
    },
    {
      no: '003',
      referenceno: '3445-32XHJ-232',
      contractname:'XYZ',
      owner:'John Doe',
      vendor:'saad khan',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'Vendor Review',
      description:'lorem ipsum dolor'
    },
  ];
}

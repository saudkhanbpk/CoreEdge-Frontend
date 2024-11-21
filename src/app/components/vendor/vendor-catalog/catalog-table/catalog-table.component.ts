import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog-table',
  templateUrl: './catalog-table.component.html',
  styleUrls: ['./catalog-table.component.css']
})
export class CatalogTableComponent {
  public data: any[] = [];
  searchTerm: string = ''; 
  user: any; 

  constructor(private dataService: DataService, private router: Router, private authService: AuthService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    // this.loadData();
    this.loadsData();
  }
  get filteredData() {
    return this.data.filter(item => item.materialId.includes(this.searchTerm));
  }
  loadData(): void {
    this.dataService.getData().subscribe((response) => {
      console.log("reds",response);
      
      this.data = response;
    });
  }
  loadsData(): void {
    this.catalogService.findByUserId(this.user.userId.id).subscribe((response:any) => {
      console.log(response);
      
      this.data = response;
    });
  }

  editCatalogItem(item: any): void {
    console.log(item);
    
    this.router.navigate(['/vendor/vendor-catalog/add-catalog'], { state: { catalogData: item } });
  }
  

  deleteItem(id: any): void {    
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Are you sure you want to delete the catalog item "${id.materialId}"? This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.catalogService.delete(id.id).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: `The catalog item "${id.materialId}" has been deleted successfully!`,
              confirmButtonText: 'OK',
            });
            this.loadsData();
          },
          (error) => {
            console.error('Error deleting item:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while deleting the catalog item.',
              confirmButtonText: 'OK',
            });
          }
        );
      }
    });
  }
  
}

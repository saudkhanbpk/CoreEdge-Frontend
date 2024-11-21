import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { DataService } from 'src/app/services/data.service';

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

  deleteItem(materialId: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.dataService.deleteInventoryItem(materialId).subscribe(() => {
        this.loadData();
      });
    }
  }
}

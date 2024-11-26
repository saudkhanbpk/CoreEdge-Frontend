// import { Component, ViewChild } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CartService } from 'src/app/services/cart.service';
// import { DataService } from 'src/app/services/data.service';
// import { FilterService } from 'src/app/services/filter.service';
// import { SearchService } from 'src/app/services/search.service';
// import { ProductDetailsComponent } from '../product-details/product-details.component';
// import { AddedProductsComponent } from '../added-products/added-products.component';
// import Swal from 'sweetalert2';
// import { CatalogService } from 'src/app/services/catalog.service';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent {
//   public data: any[] = [];
//   searchTerm: string = '';
//   pageSize: number = 24;
//   currentPage: number = 0;
//   totalProducts: number = 0;
//   user:any;
//   showInStockOnly: boolean = false;
//   selectedManufacturers: string[] = [];
//   selectedCategories: string[] = [];
//   private inStockSubscription!: Subscription;
//   private manufacturersSubscription!: Subscription;
//   private categoriesSubscription!: Subscription;
//   private searchSubscription!: Subscription;
//   disableSelect = new FormControl(false);
//   quantities: number[] = Array(this.filteredData.length).fill(1);
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   selectedView: 'cardview' | 'listview' = 'listview';
//   addedProducts: any[] = []; // Array to store added products

//   constructor(
//     private dataService: DataService,
//     private router: Router,
//     private filterService: FilterService,
//     private searchService: SearchService,
//     private cartservice: CartService,
//     public dialog: MatDialog,
//     private catalogService: CatalogService,
//     private authService: AuthService
//   ) {
//     this.user = this.authService.getUserData();

//    }

//   ngOnInit(): void {
//     this.loadsData();
//     // this.loadData();
//     this.inStockSubscription = this.filterService.inStock$.subscribe((inStock) => {
//       this.showInStockOnly = inStock;
//     });
//     this.manufacturersSubscription = this.filterService.selectedManufacturers$.subscribe((manufacturers) => {
//       this.selectedManufacturers = manufacturers;
//     });
//     this.categoriesSubscription = this.filterService.selectedcategories$.subscribe((categories) => {
//       this.selectedCategories = categories;
//     });
//     this.searchSubscription = this.searchService.search$.subscribe((term) => {
//       this.searchTerm = term;
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.inStockSubscription) {
//       this.inStockSubscription.unsubscribe();
//     }
//     if (this.manufacturersSubscription) {
//       this.manufacturersSubscription.unsubscribe();
//     }
//     if (this.categoriesSubscription) {
//       this.categoriesSubscription.unsubscribe();
//     }
//     if (this.searchSubscription) {
//       this.searchSubscription.unsubscribe();
//     }
//   }

//   incrementQuantity(index: number) {
//     this.quantities[index]++;
//   }

//   decrementQuantity(index: number) {
//     if (this.quantities[index] > 1) {
//       this.quantities[index]--;
//     }
//   }

//   loadData(): void {
//     this.dataService.getData().subscribe((response) => {
//       this.data = response;
//       this.totalProducts = response.length;      
//       this.quantities = this.filteredData.map(() => 1);

//     });
//   }

//   loadsData(): void {
//     this.catalogService.findByUserId(this.user.id).subscribe((response:any) => {
//       this.data = response;
//       this.totalProducts = response.length;
//     });
//   }

//   setView(view: 'cardview' | 'listview') {
//     this.selectedView = view;
//     console.log('View changed to:', this.selectedView);
//   }

//   get filteredData() {
//     let filtered = this.data;
//     if (this.searchTerm) {      
//       filtered = filtered.filter(item =>
//         item.materialId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.shortDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.longDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         item.price.toString().includes(this.searchTerm)
//       );
//     }
//     if (this.showInStockOnly) {
//       filtered = filtered.filter(item => item.QuantityAvailable > 0);
//     }
//     if (this.selectedManufacturers.length > 0) {
//       filtered = filtered.filter(item =>
//         this.selectedManufacturers.includes(item.ManufacturerName)
//       );
//     }
//     if (this.selectedCategories.length > 0) {
//       filtered = filtered.filter(item =>
//         this.selectedCategories.includes(item.Category)
//       );
//     }
//     const startIndex = this.currentPage * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     return filtered.slice(startIndex, endIndex);
//   }

//   onPaginateChange(event: PageEvent) {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//   }

//   changePageSize(size: number) {
//     this.pageSize = size;
//     this.currentPage = 0;
//     this.paginator.pageSize = size;
//   }
//   openDialog(item:any) {
//     const dialogRef = this.dialog.open(ProductDetailsComponent,{
//       data:item
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       this.addedProducts.push(result)
//     });
//   }

//   addRequest(item: any, quantity: number): void {
//     this.addedProducts.push({
//       product: item,    
//       quantity: quantity 
//     });
//     Swal.fire({
//       title: 'Product Added!',
//       text: `${item.MaterialId} has been added to your request list with a quantity of ${quantity}.`,
//       imageUrl: item.ImageLarge, 
//       imageWidth: 200,
//       imageHeight: 200,
//       imageAlt: 'Product image',
//       icon: 'success',
//       confirmButtonText: 'OK'
//     });
//   }


//   openProductModal(): void {
//     const dialogRef = this.dialog.open(AddedProductsComponent, {
//       // position: { bottom: '80px', right: '10px' },
//       // panelClass: 'custom-dialog-container',
//       maxWidth:'800px',
//       data: this.addedProducts ,// Pass the addedProducts array to the dialog
//     });

//     console.log(this.addedProducts)
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
// }



import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';
import { SearchService } from 'src/app/services/search.service';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddedProductsComponent } from '../added-products/added-products.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public data: any[] = [];
  public quantities: number[] = [];
  searchTerm: string = '';
  pageSize: number = 24;
  currentPage: number = 0;
  totalProducts: number = 0;
  selectedView: 'cardview' | 'listview' = 'listview';
  addedProducts: any = [];
  user: any;

  // Subscriptions
  private inStockSubscription!: Subscription;
  private manufacturersSubscription!: Subscription;
  private categoriesSubscription!: Subscription;
  private searchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dataService: DataService,
    private catalogService: CatalogService,
    private filterService: FilterService,
    private searchService: SearchService,
    private cartService: CartService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.loadCatalogData();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Load data
  private loadCatalogData(): void {
    this.catalogService.findByUserId(this.user.id).subscribe((response: any) => {
      this.data = response;
      this.totalProducts = response.length;
      this.quantities = this.data.map(() => 1); // Initialize quantities
    });
  }

  // Subscriptions
  private initializeSubscriptions(): void {
    this.inStockSubscription = this.filterService.inStock$.subscribe(inStock => { });
    this.manufacturersSubscription = this.filterService.selectedManufacturers$.subscribe(manufacturers => { });
    this.categoriesSubscription = this.filterService.selectedcategories$.subscribe(categories => { });
    this.searchSubscription = this.searchService.search$.subscribe(term => {
      this.searchTerm = term;
    });
  }

  private unsubscribeAll(): void {
    this.inStockSubscription?.unsubscribe();
    this.manufacturersSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  // View toggles
  setView(view: 'cardview' | 'listview') {
    this.selectedView = view;
  }

  // Quantity controls
  incrementQuantity(index: number): void {
    this.quantities[index]++;
  }

  decrementQuantity(index: number): void {
    if (this.quantities[index] > 1) this.quantities[index]--;
  }

  // Filtered data
  get filteredData() {
    return this.data.filter(item =>
      item.materialId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.shortDescription?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Pagination
  onPaginateChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  addRequest(item: any, quantity: number): void {
    this.cartService.addToCart({
      product: item,
      quantity: quantity,
    });

    this.addedProducts = this.cartService.getCartItems();

    Swal.fire({
      title: 'Product Added!',
      text: `${item.materialId} has been added to your request list with a quantity of ${quantity}.`,
      imageUrl: item.imageUrl,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Product image',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }



  openDialog(item:any) {
        const dialogRef = this.dialog.open(ProductDetailsComponent,{
          data:item
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.addedProducts.push(result)
        });
      }

  openProductModal(): void {
        const dialogRef = this.dialog.open(AddedProductsComponent, {
          // position: { bottom: '80px', right: '10px' },
          // panelClass: 'custom-dialog-container',
          maxWidth:'800px',
          data: this.addedProducts ,// Pass the addedProducts array to the dialog
        });
    
        console.log("log : ",this.addedProducts)
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}

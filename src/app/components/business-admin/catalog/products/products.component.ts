import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
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
import { VendorsService } from 'src/app/services/vendors.service';
import { SharedService } from 'src/app/services/shared.service';


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
  venders: any = []
  venderid: any

  // Subscriptions
  private inStockSubscription!: Subscription;
  private manufacturersSubscription!: Subscription;
  private categoriesSubscription!: Subscription;
  private searchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dataService: DataService,
    private catalogService: CatalogService,
    private sharedservice:SharedService,
    private filterService: FilterService,
    private searchService: SearchService,
    private cartService: CartService,
    private authService: AuthService,
    private VendorServices: VendorsService,
    public dialog: MatDialog
  ) {
    this.user = this.authService.getUserData();
  }

  ngOnInit(): void {
    this.loadCatalogData();
    this.initializeSubscriptions();
    this.loadRoles()
    this.sharedservice.currentSearchTerm.subscribe(term => {
      this.searchTerm = term //this search term get from catalog menu components using catalog service
    })
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
  // load vendor data
  loadRoles() {
    this.VendorServices.findAll().subscribe({
      next: (data) => {
        this.venders = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
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

  //filteredData by vendor
  filterdByVendor(venderid: any) {
    this.venderid = venderid
    const vender = this.data.filter((item: any) => item?.vendor?.id == venderid)
    console.log("filtered data", vender)
  }

  // Filtered data
  get filteredData() {
    if (!this.data || this.data.length === 0) {
      return []; // Return empty array if no data
    }  
    return this.data.filter(item => {
      console.log("material id" , item)
      const matchesSearchTerm =
        item.materialId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.shortDescription?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesVendor = !this.venderid || item?.vendor?.id === this.venderid;
      return matchesSearchTerm && matchesVendor;
    });
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



  openDialog(item: any) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addedProducts.push(result)
    });
  }

  openProductModal(): void {
    const dialogRef = this.dialog.open(AddedProductsComponent, {
      // position: { bottom: '80px', right: '10px' },
      // panelClass: 'custom-dialog-container',
      maxWidth: '800px',
      data: this.addedProducts,// Pass the addedProducts array to the dialog
    });

    console.log("log : ", this.addedProducts)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

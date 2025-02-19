import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  public filteredData: any[] = [];
  public quantities: number[] = [];
  searchTerm: string = '';
  pageSize: number = 24;
  currentPage: number = 0;
  totalProducts: number = 0;
  selectedView: 'cardview' | 'listview' = 'listview';
  addedProducts: any = [];
  user: any;
  venders: any = [];
  venderid: any = null;

  // Subscriptions
  private inStockSubscription!: Subscription;
  private manufacturersSubscription!: Subscription;
  private categoriesSubscription!: Subscription;
  private searchSubscription!: Subscription;
  private sharedSearchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dataService: DataService,
    private catalogService: CatalogService,
    private sharedservice: SharedService,
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
    this.loadRoles();

    // Subscribe to search term changes from SharedService
    this.sharedSearchSubscription = this.sharedservice.currentSearchTerm.subscribe(term => {
      this.searchTerm = term;
      this.filterData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // Load catalog data and initialize quantities
  private loadCatalogData(): void {
    this.catalogService.findByUserId(this.user.id).subscribe((response: any) => {
      this.data = response;
      this.totalProducts = response.length;
      this.quantities = this.data.map(() => 1);
      this.filterData(); // Update filteredData when data is loaded
    });
  }

  // Load vendor data
  loadRoles(): void {
    this.VendorServices.findAll().subscribe({
      next: (data) => {
        this.venders = data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  // Subscriptions to various filters (if needed for future improvements)
  private initializeSubscriptions(): void {
    this.inStockSubscription = this.filterService.inStock$.subscribe(() => {
      this.filterData();
    });
    this.manufacturersSubscription = this.filterService.selectedManufacturers$.subscribe(() => {
      this.filterData();
    });
    this.categoriesSubscription = this.filterService.selectedcategories$.subscribe(() => {
      this.filterData();
    });
    this.searchSubscription = this.searchService.search$.subscribe(term => {
      this.searchTerm = term;
      this.filterData();
    });
  }

  private unsubscribeAll(): void {
    this.inStockSubscription?.unsubscribe();
    this.manufacturersSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.sharedSearchSubscription?.unsubscribe();
  }

  // Update the view (cardview or listview)
  setView(view: 'cardview' | 'listview'): void {
    this.selectedView = view;
  }

  // Increase item quantity
  incrementQuantity(index: number): void {
    this.quantities[index]++;
  }

  // Decrease item quantity
  decrementQuantity(index: number): void {
    if (this.quantities[index] > 1) this.quantities[index]--;
  }

  // Filter data by vendor and update the filtered list
  filterdByVendor(venderid: any): void {
    this.venderid = venderid;
    this.filterData();
  }

  // Perform filtering based on searchTerm and venderid
  private filterData(): void {
    if (!this.data || this.data.length === 0) {
      this.filteredData = [];
      return;
    }

    const lowerSearchTerm = this.searchTerm.toLowerCase();

    this.filteredData = this.data.filter(item => {
      const matchesSearchTerm =
        (item.materialId && item.materialId.toLowerCase().includes(lowerSearchTerm)) ||
        (item.shortDescription && item.shortDescription.toLowerCase().includes(lowerSearchTerm));

      const matchesVendor = !this.venderid || (item.vendor && item.vendor.id === this.venderid);
      return matchesSearchTerm && matchesVendor;
    });
  }

  // Handle pagination changes (if pagination logic is implemented further)
  onPaginateChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Add product to cart and show success alert
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

  // Open product details dialog
  openDialog(item: any): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addedProducts.push(result);
      }
    });
  }

  // Open dialog to show added products
  openProductModal(): void {
    const dialogRef = this.dialog.open(AddedProductsComponent, {
      maxWidth: '800px',
      data: this.addedProducts, // Pass the addedProducts array to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

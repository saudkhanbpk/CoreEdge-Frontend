import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';
import { SearchService } from 'src/app/services/search.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddedProductsComponent } from '../added-products/added-products.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public data: any[] = [];
  searchTerm: string = '';
  pageSize: number = 24;
  currentPage: number = 0;
  totalProducts: number = 0;
  showInStockOnly: boolean = false;
  selectedManufacturers: string[] = [];
  selectedCategories: string[] = [];
  private inStockSubscription!: Subscription;
  private manufacturersSubscription!: Subscription;
  private categoriesSubscription!: Subscription;
  private searchSubscription!: Subscription;
  disableSelect = new FormControl(false);
  quantities: number[] = Array(this.filteredData.length).fill(1);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedView: 'cardview' | 'listview' = 'listview';
  addedProducts: any[] = []; // Array to store added products

  constructor(
    private dataService: DataService,
    private router: Router,
    private filterService: FilterService,
    private searchService: SearchService,
    private cartservice: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.inStockSubscription = this.filterService.inStock$.subscribe((inStock) => {
      this.showInStockOnly = inStock;
    });
    this.manufacturersSubscription = this.filterService.selectedManufacturers$.subscribe((manufacturers) => {
      this.selectedManufacturers = manufacturers;
    });
    this.categoriesSubscription = this.filterService.selectedcategories$.subscribe((categories) => {
      this.selectedCategories = categories;
    });
    this.searchSubscription = this.searchService.search$.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnDestroy(): void {
    if (this.inStockSubscription) {
      this.inStockSubscription.unsubscribe();
    }
    if (this.manufacturersSubscription) {
      this.manufacturersSubscription.unsubscribe();
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  incrementQuantity(index: number) {
    this.quantities[index]++;
  }

  decrementQuantity(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  loadData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
      this.totalProducts = response.length;
      this.quantities = this.filteredData.map(() => 1);

    });
  }

  setView(view: 'cardview' | 'listview') {
    this.selectedView = view;
    console.log('View changed to:', this.selectedView);
  }

  get filteredData() {
    let filtered = this.data;
    if (this.searchTerm) {
      filtered = filtered.filter(item =>
        item.MaterialId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.ShortDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.Category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.CustomerPrice.toString().includes(this.searchTerm)
      );
    }
    if (this.showInStockOnly) {
      filtered = filtered.filter(item => item.QuantityAvailable > 0);
    }
    if (this.selectedManufacturers.length > 0) {
      filtered = filtered.filter(item =>
        this.selectedManufacturers.includes(item.ManufacturerName)
      );
    }
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(item =>
        this.selectedCategories.includes(item.Category)
      );
    }
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.paginator.pageSize = size;
  }
  openDialog(item:any) {
    console.log("item touched", item)
    const dialogRef = this.dialog.open(ProductDetailsComponent,{
      data:item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addRequest(item: any, quantity: number): void {
    this.addedProducts.push({
      product: item,    
      quantity: quantity 
    });
    Swal.fire({
      title: 'Product Added!',
      text: `${item.MaterialId} has been added to your request list with a quantity of ${quantity}.`,
      imageUrl: item.ImageLarge, 
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Product image',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  
  
  openProductModal(): void {
    const dialogRef = this.dialog.open(AddedProductsComponent, {
      position: { bottom: '80px', right: '10px' },
      panelClass: 'custom-dialog-container',
      maxWidth:'500px',
      data: this.addedProducts ,// Pass the addedProducts array to the dialog
    });
    
    console.log(this.addedProducts)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

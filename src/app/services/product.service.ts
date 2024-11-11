import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productData: any;
  setProductData(product: any) {
    this.productData = product;
  }
  getProductData() {
    return this.productData;
  }
}

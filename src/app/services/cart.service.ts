import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  // Add item to the cart
  addToCart(item: any) {
    this.cartItems.push(item);
  }

  // Get all items in the cart
  getCartItems() {
    return this.cartItems;
  }

  updateCartItemCount() {
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCount.next(totalItems);
  }

  // Observable to watch the cart item count
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.updateCartItemCount();
  }
  addToCartlist(item: any, quantity: number) {
    if (quantity > 0) {
      const existingItem = this.cartItems.find(cartItem => cartItem.MaterialId === item.MaterialId);
      if (existingItem) {
        // Update quantity of existing item
        existingItem.quantity += quantity;
      } else {
        // Create a new cart item with all relevant details
        const cartItem = {
          ...item, // Spread operator to include all properties
          quantity // Add the quantity property
        };
        this.cartItems.push(cartItem);
      }
    }
  }

}

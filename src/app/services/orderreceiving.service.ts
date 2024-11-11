// order-receiving.service.ts
import { Injectable } from '@angular/core';
import { OrderService } from './order.service';

interface Item {
  itemname: string;
  price: number;
  quantityOrdered: number;
  quantityReceived?: number | any;
  received?: boolean;
  isBroken?: boolean;
  isWrongItem?: boolean;
}

interface ProductDetail {
  name: string;
  items: Item[];
}

interface Order {
  purchaseorderno: string;
  employeename: string;
  employeeemail: string;
  hardwarerequested: string;
  requesteddate: string;
  receiveddate: string;
  totalamount: string;
  address: string;
  productdetails: ProductDetail[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderReceivingService {
  constructor(private orderService: OrderService) {}

  // Confirm order receipt with item condition checks
  confirmOrderReceipt(order: Order) {
    order.productdetails.forEach(product => {
      product.items.forEach(item => {
        // Simulate receiving quantities and conditions
        item.quantityReceived = Math.floor(Math.random() * item.quantityOrdered + 1);
        item.isBroken = Math.random() < 0.1; // 10% chance of being broken
        item.isWrongItem = Math.random() < 0.1; // 10% chance of being the wrong item

        // Check if item received correctly
        item.received = !item.isBroken && !item.isWrongItem && item.quantityReceived === item.quantityOrdered;
      });
    });
  }

  // Get discrepancies for the order
  getDiscrepancies(order: Order): string[] {
    const discrepancies: string[] = [];
    order.productdetails.forEach(product => {
      product.items.forEach(item => {
        if (item.quantityOrdered !== item.quantityReceived) {
          discrepancies.push(`${item.itemname}: Ordered (${item.quantityOrdered}), Received (${item.quantityReceived})`);
        }
        if (item.isBroken) discrepancies.push(`${item.itemname} is broken.`);
        if (item.isWrongItem) discrepancies.push(`${item.itemname} is the wrong item received.`);
        if (!item.received) discrepancies.push(`${item.itemname} not received in good condition.`);
      });
    });
    return discrepancies;
  }

  // Handle backordered items
  handleBackorders(order: Order) {
    const backorders: Item[] = [];
    order.productdetails.forEach(product => {
      product.items.forEach(item => {
        if (item.quantityOrdered > item.quantityReceived) {
          backorders.push({
            ...item,
            quantityOrdered: item.quantityOrdered - item.quantityReceived,
            quantityReceived: 0,
          });
        }
      });
    });
    return backorders;
  }
}

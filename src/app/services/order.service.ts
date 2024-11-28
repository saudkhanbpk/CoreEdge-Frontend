// order.service.ts
import { Injectable } from '@angular/core';

interface Item {
  itemname: string;
  price: number;
  quantityOrdered: number;
  quantityReceived?: number; // Track received quantities
  received?: boolean; // Track if the item has been received
  isBroken?: boolean; // Track if the item is broken
  isWrongItem?: boolean; // Track if the item received is incorrect
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
  status:string;
  vendor: string;
  productdetails: ProductDetail[];
  discrepancies?: string[]; // For manual entry of discrepancies
  successfulItems?: Item[]; // Track successfully received items
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [
    {
      purchaseorderno: '2982-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
      status:'Pending',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
          ],
        },
      ],
    },
    {
      purchaseorderno: '3749-PQ92-75',
      employeename: 'John Doe',
      employeeemail: 'johndoe@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 10th, 2024',
      receiveddate: 'October 12th, 2024',
      totalamount: '2000',
      status:'In RMA',
      address: 'New York',
      vendor: 'Office Essentials Co.',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            { itemname: 'Laptop', price: 1200, quantityOrdered: 1 },
            { itemname: 'Docking Station', price: 300, quantityOrdered: 1 },
          ],
        },
      ],
    },
    {
      purchaseorderno: '4895-KL62-87',
      employeename: 'Alice Smith',
      employeeemail: 'alicesmith@gmail.com',
      hardwarerequested: 'Office Setup',
      requesteddate: 'October 15th, 2024',
      receiveddate: 'October 17th, 2024',
      totalamount: '4000',
      status:'Cleared',
      address: 'Chicago',
      vendor: 'Corporate Gear Solutions',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            { itemname: 'Monitor', price: 500, quantityOrdered: 2 },
            { itemname: 'Ergonomic Chair', price: 1500, quantityOrdered: 1 },
          ],
        },
      ],
    }
  ];

  getOrderByPurchaseOrderNo(purchaseOrderNo: string): Order | undefined {
    return this.orders.find(order => order.purchaseorderno === purchaseOrderNo);
  }

  saveDiscrepancies(order: Order, discrepancies: string[]) {
    order.discrepancies = discrepancies; // Store discrepancies for the order
  }

  // Method to get successful items from the order
  getSuccessfulItems(order: Order): Item[] {
    return order.productdetails.flatMap(product => 
      product.items.filter(item => item.quantityReceived && item.quantityReceived > 0)
    );
  }

  // Method to generate discrepancy reports
  generateReports(order: Order): { successfulItems: Item[], discrepancies: string[] } {
    const successfulItems = this.getSuccessfulItems(order);
    const discrepancies = order.discrepancies || [];
    
    return { successfulItems, discrepancies };
  }
}

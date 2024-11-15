import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Item {
  itemname: string;
  price: number;
  quantityOrdered: number;
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
  vendor: string;
  productdetails: ProductDetail[];
  stockMoved: boolean; // to track if stock is moved to inventory
}
@Component({
  selector: 'app-fulfillment-tasks',
  templateUrl: './fulfillment-tasks.component.html',
  styleUrls: ['./fulfillment-tasks.component.css']
})
export class FulfillmentTasksComponent {


  isCollapsed = false; 
  toggleCollapsenew(index: number) {
    this.new[index].isCollapsed = !this.new[index].isCollapsed;
  }
  toggleCollapseassigned(index: number) {
    this.assignedTasks[index].isCollapsed = !this.assignedTasks[index].isCollapsed;
  }
  toggleCollapseinprogress(index: number) {
    this.inProgress[index].isCollapsed = !this.inProgress[index].isCollapsed;
  }
  toggleCollapseonhold(index: number) {
    this.onhold[index].isCollapsed = !this.onhold[index].isCollapsed;
  }
  toggleCollapseclosed(index: number) {
    this.closed[index].isCollapsed = !this.closed[index].isCollapsed;
  }
  new = [
    {
      purchaseorderno: '001-XHJ-123',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
      productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '002-XJ82-93',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 4th, 2024',
      receiveddate: 'October 6th, 2024',
      totalamount: '1200',
      address: 'New York',
      vendor: 'Laptop World',
      productdetails: [
        
        { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
        { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
        { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
        { itemname: 'RAM', price: 35, quantityOrdered: 1 },
  ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '003-XJ82-94',
      employeename: 'Fatima Khan',
      employeeemail: 'fatima.khan@gmail.com',
      hardwarerequested: 'Office Supplies',
      requesteddate: 'October 5th, 2024',
      receiveddate: 'October 7th, 2024',
      totalamount: '200',
      address: 'Los Angeles',
      vendor: 'Stationery Hub',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
  ];
  assignedTasks = [
    {
      purchaseorderno: '004-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '005-XJ82-93',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 4th, 2024',
      receiveddate: 'October 6th, 2024',
      totalamount: '1200',
      address: 'New York',
      vendor: 'Laptop World',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '006-XJ82-94',
      employeename: 'Fatima Khan',
      employeeemail: 'fatima.khan@gmail.com',
      hardwarerequested: 'Office Supplies',
      requesteddate: 'October 5th, 2024',
      receiveddate: 'October 7th, 2024',
      totalamount: '200',
      address: 'Los Angeles',
      vendor: 'Stationery Hub',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
  ];
  inProgress = [
    {
      purchaseorderno: '007-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '008-XJ82-93',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 4th, 2024',
      receiveddate: 'October 6th, 2024',
      totalamount: '1200',
      address: 'New York',
      vendor: 'Laptop World',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '009-XJ82-94',
      employeename: 'Fatima Khan',
      employeeemail: 'fatima.khan@gmail.com',
      hardwarerequested: 'Office Supplies',
      requesteddate: 'October 5th, 2024',
      receiveddate: 'October 7th, 2024',
      totalamount: '200',
      address: 'Los Angeles',
      vendor: 'Stationery Hub',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
  ];
 
  onhold = [
    {
      purchaseorderno: '010-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '011-XJ82-93',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 4th, 2024',
      receiveddate: 'October 6th, 2024',
      totalamount: '1200',
      address: 'New York',
      vendor: 'Laptop World',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '012-XJ82-94',
      employeename: 'Fatima Khan',
      employeeemail: 'fatima.khan@gmail.com',
      hardwarerequested: 'Office Supplies',
      requesteddate: 'October 5th, 2024',
      receiveddate: 'October 7th, 2024',
      totalamount: '200',
      address: 'Los Angeles',
      vendor: 'Stationery Hub',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
  ];
  closed = [
    {
      purchaseorderno: '013-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      hardwarerequested: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      receiveddate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      vendor: 'Tech Supplies Inc.',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '014-XJ82-93',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      hardwarerequested: 'HP Laptop',
      requesteddate: 'October 4th, 2024',
      receiveddate: 'October 6th, 2024',
      totalamount: '1200',
      address: 'New York',
      vendor: 'Laptop World',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
    {
      purchaseorderno: '015-XJ82-94',
      employeename: 'Fatima Khan',
      employeeemail: 'fatima.khan@gmail.com',
      hardwarerequested: 'Office Supplies',
      requesteddate: 'October 5th, 2024',
      receiveddate: 'October 7th, 2024',
      totalamount: '200',
      address: 'Los Angeles',
      vendor: 'Stationery Hub',
       productdetails: [
        
            { itemname: 'Monitor', price: 5, quantityOrdered: 1 },
            { itemname: 'Keyboard', price: 15, quantityOrdered: 1 },
            { itemname: 'Mouse', price: 25, quantityOrdered: 1 },
            { itemname: 'RAM', price: 35, quantityOrdered: 1 },
      ],
      isCollapsed: false,
    },
  ];
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.persistOrders();
  }

  persistOrders() {
    localStorage.setItem('new', JSON.stringify(this.new));
    localStorage.setItem('assignedTasks', JSON.stringify(this.assignedTasks));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    localStorage.setItem('onhold', JSON.stringify(this.onhold));
    localStorage.setItem('closed', JSON.stringify(this.closed));

  }

  ngOnInit() {
    const savednew = localStorage.getItem('new');
    const savedassignedTasks = localStorage.getItem('assignedTasks');
    const savedinProgress = localStorage.getItem('inProgress');
    const savedonhold = localStorage.getItem('onhold');
    const savedclosed = localStorage.getItem('closed');

  }
}

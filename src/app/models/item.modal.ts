export interface Item {
    itemCode: string;
    description: string;
    orderedQuantity: number;
    receivedQuantity: number;
    barcode: string;
    status: 'Pending' | 'Received' | 'Backordered';
  }
  export interface PurchaseOrder {
    poNumber: string;
    vendor: string;
    items: Item[];
    status: 'Pending' | 'Completed';
  }  
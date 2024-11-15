import { Component } from '@angular/core';
interface Order {
  id: number;
  details: string;
  status: string;
}

interface Dispute {
  id: number;
  orderId: number;
  type: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-disputes-resolution',
  templateUrl: './disputes-resolution.component.html',
  styleUrls: ['./disputes-resolution.component.css']
})
export class DisputesResolutionComponent {
  orders: Order[] = [
    { id: 1, details: 'Order 1', status: 'Pending' },
    { id: 2, details: 'Order 2', status: 'Fulfilled' }
  ];

  disputes: Dispute[] = [];
  selectedOrderId: number | null = null;
  disputeType: string = '';
  disputeDescription: string = '';
  nextDisputeId: number = 1;

  logDispute() {
    if (this.selectedOrderId && this.disputeType && this.disputeDescription) {
      this.disputes.push({
        id: this.nextDisputeId++,
        orderId: this.selectedOrderId,
        type: this.disputeType,
        description: this.disputeDescription,
        status: 'Open'
      });
      this.clearForm();
    }
  }

  clearForm() {
    this.selectedOrderId = null;
    this.disputeType = '';
    this.disputeDescription = '';
  }

  resolveDispute(disputeId: number) {
    const dispute = this.disputes.find(d => d.id === disputeId);
    if (dispute) {
      dispute.status = 'Resolved';
    }
  }

  escalateDispute(disputeId: number) {
    const dispute = this.disputes.find(d => d.id === disputeId);
    if (dispute) {
      dispute.status = 'Escalated';
    }
  }
}

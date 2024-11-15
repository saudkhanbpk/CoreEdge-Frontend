import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent {
  hardwareList = [{ name: '', quantity: 1 }];
  addHardware() {
    this.hardwareList.push({ name: '', quantity: 1 });
  }

  removeHardware() {
    if (this.hardwareList.length > 1) {
      this.hardwareList.pop();
    }
  }
}

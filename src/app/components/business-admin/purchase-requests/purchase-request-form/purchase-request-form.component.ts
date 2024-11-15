import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-request-form',
  templateUrl: './purchase-request-form.component.html',
  styleUrls: ['./purchase-request-form.component.css']
})
export class PurchaseRequestFormComponent {
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

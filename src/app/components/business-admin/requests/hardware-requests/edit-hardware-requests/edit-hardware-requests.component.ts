import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-hardware-requests',
  templateUrl: './edit-hardware-requests.component.html',
  styleUrls: ['./edit-hardware-requests.component.css']
})
export class EditHardwareRequestsComponent {
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

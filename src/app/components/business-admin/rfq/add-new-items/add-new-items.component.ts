import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-items',
  templateUrl: './add-new-items.component.html',
  styleUrls: ['./add-new-items.component.css']
})
export class AddNewItemsComponent {
  items = [{ name: '', quantity: '' }]; // Initialize with one item

  // Method to add a new item
  addNewItem() {
    this.items.push({ name: '', quantity: '' });
  }
}

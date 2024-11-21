import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories-and-contracts',
  templateUrl: './categories-and-contracts.component.html',
  styleUrls: ['./categories-and-contracts.component.css']
})
export class CategoriesAndContractsComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  startDate: string | null = null;
  endDate: string | null = null;
  dateRange: string = '';
  showPicker: boolean = false;
  
  vendors = [
    { name: 'Star Electronics', items: 205, color: '#D0E2EC' },
    { name: 'Ace Technologies', items:180, color: '#D1E4DD40' },
    { name: 'Lester Computers', items: 163, color: '#EDEEFC' },
    { name: 'IBM Manufacturers', items: 155, color: '#D0E2EC' },
    { name: 'Hewlett Packard', items: 142, color: '#D1E4DD40' },
    { name: 'Dell Computers', items: 121, color: '#EDEEFC' },
  ];
   
  showDatePicker() {
    this.showPicker = true;
  }

  applyDateRange() {
    if (this.startDate && this.endDate) {
      this.dateRange = `${this.startDate} → ${this.endDate}`;
      this.showPicker = false;
    } else {
      alert('Please select both start and end dates');
    }
  }

  cancelDateRange() {
    this.startDate = null;
    this.endDate = null;
    this.dateRange = 'Start date  →  End date';
    this.showPicker = false;
  }
}

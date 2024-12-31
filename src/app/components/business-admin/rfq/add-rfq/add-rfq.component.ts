import { Component } from '@angular/core';

@Component({
  selector: 'app-add-rfq',
  templateUrl: './add-rfq.component.html',
  styleUrls: ['./add-rfq.component.css']
})
export class AddRfqComponent {
  showCheckboxes = false;
  vendors = ['All Existing Vendors', 'Saadk6401@gmail.com', 'Aamir321@gmail.com', 'Ihtizaza2002@gmail.com'];
  selectedvendors: string[] = [];
  
  toggleDropdown() {
    this.showCheckboxes = !this.showCheckboxes;
  }

  
  onCheckboxChange(event: any, email: string) {
    if (event.target.checked) {
      this.selectedvendors.push(email);
    } else {
      this.selectedvendors = this.selectedvendors.filter(item => item !== email);
    }
  }

  removeTag(index: number) {
    console.log('Removing tag at index:', index);
    this.selectedvendors.splice(index, 1);
    console.log('Updated selectedsms:', this.selectedvendors);
  }
  

}

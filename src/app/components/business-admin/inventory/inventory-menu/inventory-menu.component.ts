import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryProductDetailsComponent } from '../inventory-product-details/inventory-product-details.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.css']
})
export class InventoryMenuComponent {
  public inventoryData: any[] = [];
  searchTerm: string = ''; 
  selectedView: 'cardview' | 'listview' = 'listview';
  uploadedData: any[] = [];


  constructor(private dataService: DataService, private router: Router,
    private inventoryService:InventoryService,
    private authService:AuthService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  get filteredData() {
    return [...this.inventoryData, ...this.uploadedData].filter(item => item.MaterialId.includes(this.searchTerm));
  }

  loadData(): void {
    this.inventoryService.findAll().subscribe((response) => {
      this.inventoryData = response;
      console.log("this is inventory items", this.inventoryData)
    });
  }

  deleteItem(materialId: any): void {
      this.inventoryService.delete(materialId).subscribe(() => {
        this.loadData();
      });
  }

  setView(view: 'cardview' | 'listview') {
    this.selectedView = view;
    console.log('View changed to:', this.selectedView);
  }

  openDialog(item: any) {
    console.log("item touched", item);
    const dialogRef = this.dialog.open(InventoryProductDetailsComponent, {
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.readFile(file);
    } else {
      // Show SweetAlert2 modal for invalid file type
      Swal.fire({
        title: 'Invalid File!',
        text: 'Please upload a valid CSV file.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }
  
  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvContent = e.target.result;
      this.uploadedData = this.parseCSV(csvContent);
  
      // Show SweetAlert2 modal on successful CSV upload
      Swal.fire({
        title: 'File Uploaded Successfully!',
        text: 'The CSV file has been successfully processed.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    };
    reader.readAsText(file);
  }
  
  private parseCSV(csvContent: string): any[] {
    const rows = csvContent.split('\n').map(row => row.trim());
    const headers = rows[0].split(',').map(header => header.trim());
    return rows.slice(1).filter(row => row).map(row => {
      const values = row.split(',').map(value => value.trim());
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });
  }
  combineData(): void {
    this.inventoryData = [...this.inventoryData, ...this.uploadedData]; // Merge uploaded data into main data array
    this.uploadedData = []; // Clear uploadedData after merging
    alert('CSV data successfully uploaded and merged!');
  }
  downloadCSV(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to download the CSV file?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, download it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        const fileName = 'download-example.xlsx'; 
        const fileUrl = 'assets/download-example.xlsx'; 
        const link = document.createElement('a');
        link.href = fileUrl; 
        link.download = fileName;  
        link.click();
        Swal.fire(
          'Downloading!',
          'Your file is now being downloaded.',
          'success'
        );
      } else {
        Swal.fire(
          'Cancelled',
          'The download was cancelled.',
          'info'
        );
      }
    });
  }

  
}

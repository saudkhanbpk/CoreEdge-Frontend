import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { VendorsService } from 'src/app/services/vendors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent {
  uploadedImageUrl: any;
  inventoryItemForm: FormGroup;
  isEdit: boolean = false;
  materialId: any;
  userId: any;
  vendors:any[]=[];
  selectedFile: string | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private inventoryService: InventoryService,
    private vendorService: VendorsService,
    private authSerivce: AuthService
  ) {
    this.userId = this.authSerivce.getUserData()?.id;
    this.inventoryItemForm = this.fb.group({
      materialId: ['', Validators.required],
      partNumber: ['', Validators.required],
      price: ['', Validators.required],
      quantityAvailable: ['', Validators.required],
      manufacturerPartNumber: ['', Validators.required],
      manufacturerName: ['', Validators.required],
      category: ['', Validators.required],
      unspc: [null, Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      imageUrl: [''],
      user: [this.userId]
    });
  }

  ngOnInit(): void {
    this.materialId = this.route.snapshot.paramMap.get('id');
    if (this.materialId) {
      this.isEdit = true;
      // Fetch existing inventory data and populate the form
      this.inventoryService.findById(this.materialId).subscribe((item) => {
        console.log('item: ', item);
        if (item) {
          this.inventoryItemForm.patchValue(item);
          this.uploadedImageUrl = item.imageUrl; // Populate imageUrl if available
        }
      });
    }
  }
 
  saveInventoryItem(): void {
    const itemData = this.inventoryItemForm.value;
  
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an image file!',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('inventoryitem', JSON.stringify(itemData));
    formData.append('file', this.selectedFile); 
  
    if (this.isEdit) {
      this.inventoryService.update(this.materialId, formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inventory Item Updated',
            text: 'The Inventory item has been updated successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/business-admin/inventory/inventory-menu']);
          });
        },
        (error) => {
          console.error('Error updating Inventory item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while updating the Inventory item.',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      console.log("formData",formData);
      this.inventoryService.create(formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Inventory Item Added',
            text: 'The Inventory item has been added successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/business-admin/inventory/inventory-menu']);
          });
        },
        (error) => {
          console.error('Error adding Inventory item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while adding the Inventory item.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Keep the file for database upload
  
      // Generate preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result; // Set preview URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      this.uploadedImageUrl = null; // Clear preview if no file is selected
    }

}
}

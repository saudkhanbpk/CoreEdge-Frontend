import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent implements OnInit {
  uploadedImageUrl: string | null = null; // Store image URL
  selectedFile: string | null = null; // For uploading to the database

  user: any;
  id: any;
  inventoryItemForm!: FormGroup;
  isEdit: boolean = false;
  materialId: string | null = null;
 
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the id from route parameters
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("log is : ",this.id);
    
    if (this.id) {
      this.isEdit = true;
      // Fetch the catalog item using the id
      this.catalogService.findById(this.id).subscribe((item) => {
        if (item) {
          // Populate the form with the fetched item data
          this.inventoryItemForm.patchValue(item);
          this.uploadedImageUrl = item.imageUrl || ''; // Set the image URL if available
        } else {
          // Handle error if item is not found
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Catalog item not found!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/vendor/vendor-catalog/catalog-table']);
          });
        }
      });
    }

    // Get user data from auth service
    this.user = this.authService.getUserData();
console.log("user is : ",this.user);

    // Initialize the form with default values
    this.inventoryItemForm = this.fb.group({
      materialId: ['', Validators.required],
      partNumber: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantityAvailable: ['', [Validators.required, Validators.min(0)]],
      manufacturerPartNumber: ['', Validators.required],
      manufacturerName: ['', Validators.required],
      category: ['', Validators.required],
      unspc: [null, Validators.required],
      shortDescription: ['', [Validators.required, Validators.maxLength(150)]],
      longDescription: ['', Validators.required],
      imageUrl: [''], 
      vendor: [this.user?.id || null, Validators.required], 
      user: [this.user?.userId?.id || null, Validators.required], 
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; 
        const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result; 
      };
      reader.readAsDataURL(file); 
    } else {
      this.uploadedImageUrl = null; 
    }
  }
  
  saveInventoryItem(): void {
    const formData = new FormData();
    const itemData = this.inventoryItemForm.value;
  
    formData.append('CatalogItem', JSON.stringify(itemData));
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile); 
    } else if (!this.isEdit) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an image file!',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    if (this.isEdit) {
      this.catalogService.updateCatalogItem(this.id, formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Catalog Item Updated',
            text: 'The catalog item has been updated successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/vendor/vendor-catalog/catalog-table']);
          });
        },
        (error) => {
          console.error('Error updating catalog item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while updating the catalog item.',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      this.catalogService.create(formData).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Catalog Item Added',
            text: 'The catalog item has been added successfully!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/vendor/vendor-catalog/catalog-table']);
          });
        },
        (error) => {
          console.error('Error adding catalog item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while adding the catalog item.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
  
}

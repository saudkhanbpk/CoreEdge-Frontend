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
  inventoryItemForm: FormGroup;
  isEdit: boolean = false;
  materialId: string | null = null;
 
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private catalogService: CatalogService,
    private authService: AuthService
  ) {
    // Get the current navigation data
    const navigation = this.router.getCurrentNavigation();
    console.log("navigation: ", navigation);
  
    const catalogData = navigation?.extras?.state?.['catalogData'];
    console.log("catalogData: ", catalogData);
    if(catalogData){
      this.isEdit = true;
      this.uploadedImageUrl = catalogData?.imageUrl || null;
      this.id=catalogData.id;
    }
  

    // Get user data
    this.user = this.authService.getUserData();
  
    // Initialize the reactive form
    this.inventoryItemForm = this.fb.group({
      materialId: [catalogData?.materialId || '', Validators.required], // Prefill if data exists
      partNumber: [catalogData?.partNumber || '', Validators.required],
      price: [catalogData?.price || '', [Validators.required, Validators.min(0)]],
      quantityAvailable: [catalogData?.quantityAvailable || '', [Validators.required, Validators.min(0)]],
      manufacturerPartNumber: [catalogData?.manufacturerPartNumber || '', Validators.required],
      manufacturerName: [catalogData?.manufacturerName || '', Validators.required],
      category: [catalogData?.category || '', Validators.required],
      unspc: [catalogData?.unspc || null, Validators.required],
      shortDescription: [catalogData?.shortDescription || '', [Validators.required, Validators.maxLength(150)]],
      longDescription: [catalogData?.longDescription || '', Validators.required],
      imageUrl: [catalogData?.imageUrl || ''], // Prefill the image URL if provided
      vendor: [catalogData?.vendor || this.user?.id || null, Validators.required], // Use existing vendor or user ID
      user: [catalogData?.user || this.user?.userId?.id || null, Validators.required], // Use existing or current user ID
    });
  }
  

  ngOnInit(): void {
 

    this.materialId = this.route.snapshot.paramMap.get('id');
    if (this.materialId) {
      this.isEdit = true;
      // Fetch existing inventory data and populate the form
      this.dataService.getInventoryItem(this.materialId).subscribe((item) => {
        if (item) {
          this.inventoryItemForm.patchValue(item);
          this.uploadedImageUrl = item.imageUrl; // Populate imageUrl if available
        }
      });
    }
  }

  // Handle file selection for image upload
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.uploadedImageUrl = file; 
  //   }
  // }

  onFileSelected(event: any): void {
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
  
  // Save or update inventory item
  saveInventoryItem(): void {
    // Create FormData object for file upload
    const formData = new FormData();
  
    // Get item data from form values
    const itemData = this.inventoryItemForm.value;
  
    // Append itemData as JSON string
    formData.append('CatalogItem', JSON.stringify(itemData));
  
    // Validate if a file is selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile); // Append selected file
    } else if (!this.isEdit) {
      // If no file selected and not in edit mode, show error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select an image file!',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Check if we are editing or creating a new catalog item
    if (this.isEdit) {
      // Edit existing catalog item
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
      // Create new catalog item
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

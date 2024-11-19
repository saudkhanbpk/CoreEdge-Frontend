import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent {
  uploadedImageUrl: any;
  inventoryItemForm: FormGroup;
  isEdit: boolean = false;
  materialId: string | null = null;  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private catalogService:CatalogService
  ) {
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
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.materialId = this.route.snapshot.paramMap.get('id');
    if (this.materialId) {
      this.isEdit = true; 

      this.dataService.getInventoryItem(this.materialId).subscribe((item) => {
        if (item) {
          this.inventoryItemForm.patchValue(item);
        }
      });
    }
  }

  saveInventoryItem(): void {
    const itemData = this.inventoryItemForm.value;
    console.log('itemData: ', itemData);
      this.catalogService.create(itemData,this.uploadedImageUrl).subscribe((res:any) => {
        console.log('res: ', res);
        // this.router.navigate(['/business-admin/inventory']);
      }); 
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}

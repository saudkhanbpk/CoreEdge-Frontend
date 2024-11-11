import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private dataService: DataService
  ) {
    this.inventoryItemForm = this.fb.group({
      MaterialId: ['', Validators.required],
      InsightPartNumber: ['', Validators.required],
      CustomerPrice: ['', Validators.required],
      QuantityAvailable: ['', Validators.required],
      ManufacturerPartNumber: ['', Validators.required],
      ManufacturerName: ['', Validators.required],
      Category: ['', Validators.required],
      UNSPSC: [null, Validators.required],
      ShortDescription: ['', Validators.required],
      LongDescription: ['', Validators.required],
      ImageLarge: ['']
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
    if (this.isEdit && this.materialId) {
      this.dataService.updateInventoryItem(this.materialId, itemData).subscribe(() => {
        this.router.navigate(['/business-admin/inventory']);
      });
    } else {
      this.dataService.addInventoryItem(itemData).subscribe(() => {
        this.router.navigate(['/business-admin/inventory']);
      });
    }
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

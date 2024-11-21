import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent {
  uploadedImageUrl: any;
  inventoryItemForm: FormGroup;
  isEdit: boolean = false;
  materialId: string | null = null;
  userId: any;
  vendors:any[]=[];
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
      this.inventoryService.create(itemData, this.uploadedImageUrl).subscribe((res: any) => {
        console.log('res: ', res);
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

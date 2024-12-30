import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPurchaseOrderTableComponent } from './vendor-purchase-order-table.component';

describe('VendorPurchaseOrderTableComponent', () => {
  let component: VendorPurchaseOrderTableComponent;
  let fixture: ComponentFixture<VendorPurchaseOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPurchaseOrderTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPurchaseOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

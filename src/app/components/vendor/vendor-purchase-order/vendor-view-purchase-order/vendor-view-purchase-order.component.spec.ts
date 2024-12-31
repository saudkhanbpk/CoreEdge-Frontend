import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewPurchaseOrderComponent } from './vendor-view-purchase-order.component';

describe('VendorViewPurchaseOrderComponent', () => {
  let component: VendorViewPurchaseOrderComponent;
  let fixture: ComponentFixture<VendorViewPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorViewPurchaseOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorViewPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

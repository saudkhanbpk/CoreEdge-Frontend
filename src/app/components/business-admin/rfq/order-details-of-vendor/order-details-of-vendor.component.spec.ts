import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsOfVendorComponent } from './order-details-of-vendor.component';

describe('OrderDetailsOfVendorComponent', () => {
  let component: OrderDetailsOfVendorComponent;
  let fixture: ComponentFixture<OrderDetailsOfVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsOfVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsOfVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

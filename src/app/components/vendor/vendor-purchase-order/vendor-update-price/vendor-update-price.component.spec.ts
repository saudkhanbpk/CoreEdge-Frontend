import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdatePriceComponent } from './vendor-update-price.component';

describe('VendorUpdatePriceComponent', () => {
  let component: VendorUpdatePriceComponent;
  let fixture: ComponentFixture<VendorUpdatePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUpdatePriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorUpdatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

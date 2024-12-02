import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductDetailsComponent } from './inventory-product-details.component';

describe('InventoryProductDetailsComponent', () => {
  let component: InventoryProductDetailsComponent;
  let fixture: ComponentFixture<InventoryProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

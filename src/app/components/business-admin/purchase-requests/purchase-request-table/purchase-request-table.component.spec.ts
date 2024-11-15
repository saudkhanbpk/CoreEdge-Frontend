import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestTableComponent } from './purchase-request-table.component';

describe('PurchaseRequestTableComponent', () => {
  let component: PurchaseRequestTableComponent;
  let fixture: ComponentFixture<PurchaseRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRequestTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

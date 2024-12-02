import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPurchaseRequestComponent } from './approved-purchase-request.component';

describe('ApprovedPurchaseRequestComponent', () => {
  let component: ApprovedPurchaseRequestComponent;
  let fixture: ComponentFixture<ApprovedPurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

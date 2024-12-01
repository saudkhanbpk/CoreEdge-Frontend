import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovedPurchaseRequestComponent } from './view-approved-purchase-request.component';

describe('ViewApprovedPurchaseRequestComponent', () => {
  let component: ViewApprovedPurchaseRequestComponent;
  let fixture: ComponentFixture<ViewApprovedPurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApprovedPurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApprovedPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

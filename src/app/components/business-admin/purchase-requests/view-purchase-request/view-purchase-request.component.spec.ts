import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseRequestComponent } from './view-purchase-request.component';

describe('ViewPurchaseRequestComponent', () => {
  let component: ViewPurchaseRequestComponent;
  let fixture: ComponentFixture<ViewPurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

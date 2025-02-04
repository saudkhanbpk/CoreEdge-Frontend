import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOpenDisputesComponent } from './vendor-open-disputes.component';

describe('VendorOpenDisputesComponent', () => {
  let component: VendorOpenDisputesComponent;
  let fixture: ComponentFixture<VendorOpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorOpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorOpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

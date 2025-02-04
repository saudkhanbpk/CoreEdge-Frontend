import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewOpenDisputesComponent } from './vendor-view-open-disputes.component';

describe('VendorViewOpenDisputesComponent', () => {
  let component: VendorViewOpenDisputesComponent;
  let fixture: ComponentFixture<VendorViewOpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorViewOpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorViewOpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

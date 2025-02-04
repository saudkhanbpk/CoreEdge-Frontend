import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorResolvedDisputesComponent } from './vendor-resolved-disputes.component';

describe('VendorResolvedDisputesComponent', () => {
  let component: VendorResolvedDisputesComponent;
  let fixture: ComponentFixture<VendorResolvedDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorResolvedDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorResolvedDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

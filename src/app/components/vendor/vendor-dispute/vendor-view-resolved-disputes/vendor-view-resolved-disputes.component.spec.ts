import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorViewResolvedDisputesComponent } from './vendor-view-resolved-disputes.component';

describe('VendorViewResolvedDisputesComponent', () => {
  let component: VendorViewResolvedDisputesComponent;
  let fixture: ComponentFixture<VendorViewResolvedDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorViewResolvedDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorViewResolvedDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

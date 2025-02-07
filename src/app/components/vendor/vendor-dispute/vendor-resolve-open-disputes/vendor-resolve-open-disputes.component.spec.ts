import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorResolveOpenDisputesComponent } from './vendor-resolve-open-disputes.component';

describe('VendorResolveOpenDisputesComponent', () => {
  let component: VendorResolveOpenDisputesComponent;
  let fixture: ComponentFixture<VendorResolveOpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorResolveOpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorResolveOpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

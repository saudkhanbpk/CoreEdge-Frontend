import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDisputeResolutionComponent } from './vendor-dispute-resolution.component';

describe('VendorDisputeResolutionComponent', () => {
  let component: VendorDisputeResolutionComponent;
  let fixture: ComponentFixture<VendorDisputeResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDisputeResolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDisputeResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

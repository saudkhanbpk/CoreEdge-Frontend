import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardMainComponent } from './vendor-dashboard-main.component';

describe('VendorDashboardMainComponent', () => {
  let component: VendorDashboardMainComponent;
  let fixture: ComponentFixture<VendorDashboardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDashboardMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPerformanceTableComponent } from './vendor-performance-table.component';

describe('VendorPerformanceTableComponent', () => {
  let component: VendorPerformanceTableComponent;
  let fixture: ComponentFixture<VendorPerformanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPerformanceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPerformanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

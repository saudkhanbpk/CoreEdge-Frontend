import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDetailTableComponent } from './supplier-detail-table.component';

describe('SupplierDetailTableComponent', () => {
  let component: SupplierDetailTableComponent;
  let fixture: ComponentFixture<SupplierDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDetailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

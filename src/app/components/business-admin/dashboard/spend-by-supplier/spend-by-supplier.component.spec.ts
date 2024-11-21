import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendBySupplierComponent } from './spend-by-supplier.component';

describe('SpendBySupplierComponent', () => {
  let component: SpendBySupplierComponent;
  let fixture: ComponentFixture<SpendBySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendBySupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendBySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

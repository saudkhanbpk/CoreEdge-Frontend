import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearOrderPoppComponent } from './clear-order-popp.component';

describe('ClearOrderPoppComponent', () => {
  let component: ClearOrderPoppComponent;
  let fixture: ComponentFixture<ClearOrderPoppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearOrderPoppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearOrderPoppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

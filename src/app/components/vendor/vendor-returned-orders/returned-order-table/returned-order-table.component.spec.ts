import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedOrderTableComponent } from './returned-order-table.component';

describe('ReturnedOrderTableComponent', () => {
  let component: ReturnedOrderTableComponent;
  let fixture: ComponentFixture<ReturnedOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedOrderTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

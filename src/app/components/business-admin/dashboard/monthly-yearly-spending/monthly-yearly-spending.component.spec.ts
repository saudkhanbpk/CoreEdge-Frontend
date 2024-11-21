import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyYearlySpendingComponent } from './monthly-yearly-spending.component';

describe('MonthlyYearlySpendingComponent', () => {
  let component: MonthlyYearlySpendingComponent;
  let fixture: ComponentFixture<MonthlyYearlySpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyYearlySpendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyYearlySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

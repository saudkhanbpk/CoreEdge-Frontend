import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExpendituresComponent } from './employee-expenditures.component';

describe('EmployeeExpendituresComponent', () => {
  let component: EmployeeExpendituresComponent;
  let fixture: ComponentFixture<EmployeeExpendituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeExpendituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeExpendituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendByDepartmentComponent } from './spend-by-department.component';

describe('SpendByDepartmentComponent', () => {
  let component: SpendByDepartmentComponent;
  let fixture: ComponentFixture<SpendByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendByDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

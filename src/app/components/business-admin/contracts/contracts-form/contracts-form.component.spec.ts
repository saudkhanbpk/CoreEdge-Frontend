import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsFormComponent } from './contracts-form.component';

describe('ContractsFormComponent', () => {
  let component: ContractsFormComponent;
  let fixture: ComponentFixture<ContractsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

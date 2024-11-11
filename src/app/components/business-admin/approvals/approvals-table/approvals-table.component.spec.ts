import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsTableComponent } from './approvals-table.component';

describe('ApprovalsTableComponent', () => {
  let component: ApprovalsTableComponent;
  let fixture: ComponentFixture<ApprovalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

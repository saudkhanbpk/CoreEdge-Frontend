import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsMainComponent } from './approvals-main.component';

describe('ApprovalsMainComponent', () => {
  let component: ApprovalsMainComponent;
  let fixture: ComponentFixture<ApprovalsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestsDashboardComponent } from './pending-requests-dashboard.component';

describe('PendingRequestsDashboardComponent', () => {
  let component: PendingRequestsDashboardComponent;
  let fixture: ComponentFixture<PendingRequestsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRequestsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

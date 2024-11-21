import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedHardwareRequestsComponent } from './approved-hardware-requests.component';

describe('ApprovedHardwareRequestsComponent', () => {
  let component: ApprovedHardwareRequestsComponent;
  let fixture: ComponentFixture<ApprovedHardwareRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedHardwareRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedHardwareRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

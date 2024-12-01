import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedHardwareRequestComponent } from './approved-hardware-request.component';

describe('ApprovedHardwareRequestComponent', () => {
  let component: ApprovedHardwareRequestComponent;
  let fixture: ComponentFixture<ApprovedHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

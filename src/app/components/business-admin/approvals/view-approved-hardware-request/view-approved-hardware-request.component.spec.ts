import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovedHardwareRequestComponent } from './view-approved-hardware-request.component';

describe('ViewApprovedHardwareRequestComponent', () => {
  let component: ViewApprovedHardwareRequestComponent;
  let fixture: ComponentFixture<ViewApprovedHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApprovedHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApprovedHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

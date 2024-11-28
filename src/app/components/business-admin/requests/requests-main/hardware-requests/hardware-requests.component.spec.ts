import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareRequestsComponent } from './hardware-requests.component';

describe('HardwareRequestsComponent', () => {
  let component: HardwareRequestsComponent;
  let fixture: ComponentFixture<HardwareRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

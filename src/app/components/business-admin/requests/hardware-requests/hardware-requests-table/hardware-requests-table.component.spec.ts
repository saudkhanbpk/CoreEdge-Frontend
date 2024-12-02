import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareRequestsTableComponent } from './hardware-requests-table.component';

describe('HardwareRequestsTableComponent', () => {
  let component: HardwareRequestsTableComponent;
  let fixture: ComponentFixture<HardwareRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareRequestsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardwareRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

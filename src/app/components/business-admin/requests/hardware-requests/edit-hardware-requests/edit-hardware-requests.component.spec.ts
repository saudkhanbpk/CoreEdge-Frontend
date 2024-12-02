import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHardwareRequestsComponent } from './edit-hardware-requests.component';

describe('EditHardwareRequestsComponent', () => {
  let component: EditHardwareRequestsComponent;
  let fixture: ComponentFixture<EditHardwareRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHardwareRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHardwareRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

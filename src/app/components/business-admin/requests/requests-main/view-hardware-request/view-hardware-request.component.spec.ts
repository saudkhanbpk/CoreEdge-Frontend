import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHardwareRequestComponent } from './view-hardware-request.component';

describe('ViewHardwareRequestComponent', () => {
  let component: ViewHardwareRequestComponent;
  let fixture: ComponentFixture<ViewHardwareRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHardwareRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHardwareRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

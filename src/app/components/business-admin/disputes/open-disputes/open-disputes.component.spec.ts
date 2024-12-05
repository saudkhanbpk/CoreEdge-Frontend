import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDisputesComponent } from './open-disputes.component';

describe('OpenDisputesComponent', () => {
  let component: OpenDisputesComponent;
  let fixture: ComponentFixture<OpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

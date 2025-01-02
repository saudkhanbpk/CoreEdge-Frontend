import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRfqComponent } from './rejected-rfq.component';

describe('RejectedRfqComponent', () => {
  let component: RejectedRfqComponent;
  let fixture: ComponentFixture<RejectedRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedRfqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

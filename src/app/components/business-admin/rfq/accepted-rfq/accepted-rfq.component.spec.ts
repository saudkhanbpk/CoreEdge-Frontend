import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRfqComponent } from './accepted-rfq.component';

describe('AcceptedRfqComponent', () => {
  let component: AcceptedRfqComponent;
  let fixture: ComponentFixture<AcceptedRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedRfqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitonedRfqComponent } from './requisitoned-rfq.component';

describe('RequisitonedRfqComponent', () => {
  let component: RequisitonedRfqComponent;
  let fixture: ComponentFixture<RequisitonedRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitonedRfqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitonedRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

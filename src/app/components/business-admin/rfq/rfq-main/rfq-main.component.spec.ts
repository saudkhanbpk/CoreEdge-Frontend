import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqMainComponent } from './rfq-main.component';

describe('RfqMainComponent', () => {
  let component: RfqMainComponent;
  let fixture: ComponentFixture<RfqMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

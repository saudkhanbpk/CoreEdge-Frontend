import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqAllrfqsComponent } from './rfq-allrfqs.component';

describe('RfqAllrfqsComponent', () => {
  let component: RfqAllrfqsComponent;
  let fixture: ComponentFixture<RfqAllrfqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqAllrfqsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqAllrfqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

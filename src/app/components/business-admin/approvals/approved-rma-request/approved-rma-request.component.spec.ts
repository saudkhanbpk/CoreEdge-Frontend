import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRmaRequestComponent } from './approved-rma-request.component';

describe('ApprovedRmaRequestComponent', () => {
  let component: ApprovedRmaRequestComponent;
  let fixture: ComponentFixture<ApprovedRmaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRmaRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRmaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

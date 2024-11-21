import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRmaRequestsComponent } from './approved-rma-requests.component';

describe('ApprovedRmaRequestsComponent', () => {
  let component: ApprovedRmaRequestsComponent;
  let fixture: ComponentFixture<ApprovedRmaRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRmaRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRmaRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

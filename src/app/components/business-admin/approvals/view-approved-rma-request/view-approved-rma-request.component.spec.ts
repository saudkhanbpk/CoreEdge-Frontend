import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovedRmaRequestComponent } from './view-approved-rma-request.component';

describe('ViewApprovedRmaRequestComponent', () => {
  let component: ViewApprovedRmaRequestComponent;
  let fixture: ComponentFixture<ViewApprovedRmaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApprovedRmaRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApprovedRmaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

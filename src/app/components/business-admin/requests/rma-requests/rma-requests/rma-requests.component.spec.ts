import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaRequestsComponent } from './rma-requests.component';

describe('RmaRequestsComponent', () => {
  let component: RmaRequestsComponent;
  let fixture: ComponentFixture<RmaRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmaRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmaRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

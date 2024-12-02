import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmaRequestsTableComponent } from './rma-requests-table.component';

describe('RmaRequestsTableComponent', () => {
  let component: RmaRequestsTableComponent;
  let fixture: ComponentFixture<RmaRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmaRequestsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmaRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

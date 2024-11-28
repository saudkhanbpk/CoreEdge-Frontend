import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRmaRequestComponent } from './view-rma-request.component';

describe('ViewRmaRequestComponent', () => {
  let component: ViewRmaRequestComponent;
  let fixture: ComponentFixture<ViewRmaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRmaRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRmaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRmaComponent } from './view-rma.component';

describe('ViewRmaComponent', () => {
  let component: ViewRmaComponent;
  let fixture: ComponentFixture<ViewRmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

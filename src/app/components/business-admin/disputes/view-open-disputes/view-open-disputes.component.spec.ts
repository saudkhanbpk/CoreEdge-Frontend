import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpenDisputesComponent } from './view-open-disputes.component';

describe('ViewOpenDisputesComponent', () => {
  let component: ViewOpenDisputesComponent;
  let fixture: ComponentFixture<ViewOpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResolvedDisputesComponent } from './view-resolved-disputes.component';

describe('ViewResolvedDisputesComponent', () => {
  let component: ViewResolvedDisputesComponent;
  let fixture: ComponentFixture<ViewResolvedDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResolvedDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResolvedDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedDisputesComponent } from './resolved-disputes.component';

describe('ResolvedDisputesComponent', () => {
  let component: ResolvedDisputesComponent;
  let fixture: ComponentFixture<ResolvedDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolvedDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

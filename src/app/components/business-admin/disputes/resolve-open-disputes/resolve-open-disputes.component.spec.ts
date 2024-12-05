import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveOpenDisputesComponent } from './resolve-open-disputes.component';

describe('ResolveOpenDisputesComponent', () => {
  let component: ResolveOpenDisputesComponent;
  let fixture: ComponentFixture<ResolveOpenDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolveOpenDisputesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolveOpenDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputesResolutionComponent } from './disputes-resolution.component';

describe('DisputesResolutionComponent', () => {
  let component: DisputesResolutionComponent;
  let fixture: ComponentFixture<DisputesResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisputesResolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputesResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

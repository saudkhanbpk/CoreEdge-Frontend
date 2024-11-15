import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatscardsComponent } from './statscards.component';

describe('StatscardsComponent', () => {
  let component: StatscardsComponent;
  let fixture: ComponentFixture<StatscardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatscardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsChartComponent } from './requests-chart.component';

describe('RequestsChartComponent', () => {
  let component: RequestsChartComponent;
  let fixture: ComponentFixture<RequestsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentTasksComponent } from './fulfillment-tasks.component';

describe('FulfillmentTasksComponent', () => {
  let component: FulfillmentTasksComponent;
  let fixture: ComponentFixture<FulfillmentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulfillmentTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FulfillmentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

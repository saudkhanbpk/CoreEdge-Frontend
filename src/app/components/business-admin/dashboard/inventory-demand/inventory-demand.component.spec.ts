import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDemandComponent } from './inventory-demand.component';

describe('InventoryDemandComponent', () => {
  let component: InventoryDemandComponent;
  let fixture: ComponentFixture<InventoryDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

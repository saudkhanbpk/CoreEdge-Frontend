import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsAndInventoryEvaluationComponent } from './vendors-and-inventory-evaluation.component';

describe('VendorsAndInventoryEvaluationComponent', () => {
  let component: VendorsAndInventoryEvaluationComponent;
  let fixture: ComponentFixture<VendorsAndInventoryEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsAndInventoryEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsAndInventoryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

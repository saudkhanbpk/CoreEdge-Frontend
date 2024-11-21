import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAndContractsComponent } from './categories-and-contracts.component';

describe('CategoriesAndContractsComponent', () => {
  let component: CategoriesAndContractsComponent;
  let fixture: ComponentFixture<CategoriesAndContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesAndContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesAndContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

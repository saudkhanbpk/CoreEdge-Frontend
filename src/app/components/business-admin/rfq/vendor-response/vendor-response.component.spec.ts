import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorResponseComponent } from './vendor-response.component';

describe('VendorResponseComponent', () => {
  let component: VendorResponseComponent;
  let fixture: ComponentFixture<VendorResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvoiceDetailsComponent } from './send-invoice-details.component';

describe('SendInvoiceDetailsComponent', () => {
  let component: SendInvoiceDetailsComponent;
  let fixture: ComponentFixture<SendInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendInvoiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

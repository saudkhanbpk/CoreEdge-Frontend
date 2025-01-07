import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvoiceTableComponent } from './send-invoice-table.component';

describe('SendInvoiceTableComponent', () => {
  let component: SendInvoiceTableComponent;
  let fixture: ComponentFixture<SendInvoiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendInvoiceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

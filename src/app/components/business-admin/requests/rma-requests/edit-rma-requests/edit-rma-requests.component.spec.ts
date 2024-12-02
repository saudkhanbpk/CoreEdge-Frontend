import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRmaRequestsComponent } from './edit-rma-requests.component';

describe('EditRmaRequestsComponent', () => {
  let component: EditRmaRequestsComponent;
  let fixture: ComponentFixture<EditRmaRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRmaRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRmaRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

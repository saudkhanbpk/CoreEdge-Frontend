import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMerchandiseAuthorizationComponent } from './return-merchandise-authorization.component';

describe('ReturnMerchandiseAuthorizationComponent', () => {
  let component: ReturnMerchandiseAuthorizationComponent;
  let fixture: ComponentFixture<ReturnMerchandiseAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnMerchandiseAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnMerchandiseAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

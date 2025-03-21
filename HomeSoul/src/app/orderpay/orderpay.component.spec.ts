import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpayComponent } from './orderpay.component';

describe('OrderpayComponent', () => {
  let component: OrderpayComponent;
  let fixture: ComponentFixture<OrderpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderpayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

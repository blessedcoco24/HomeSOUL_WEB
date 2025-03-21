import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemproductsComponent } from './xemproducts.component';

describe('XemproductsComponent', () => {
  let component: XemproductsComponent;
  let fixture: ComponentFixture<XemproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XemproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

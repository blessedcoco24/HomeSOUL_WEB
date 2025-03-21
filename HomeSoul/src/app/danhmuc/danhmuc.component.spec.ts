import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucComponent } from './danhmuc.component';

describe('DanhmucComponent', () => {
  let component: DanhmucComponent;
  let fixture: ComponentFixture<DanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhmucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

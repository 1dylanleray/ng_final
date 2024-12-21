import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelUnitComponent } from './hotel-unit.component';

describe('HotelUnitComponent', () => {
  let component: HotelUnitComponent;
  let fixture: ComponentFixture<HotelUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelUnitComponent]
    });
    fixture = TestBed.createComponent(HotelUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

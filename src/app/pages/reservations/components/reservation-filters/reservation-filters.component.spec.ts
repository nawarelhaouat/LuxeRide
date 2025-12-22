import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFiltersComponent } from './reservation-filters.component';

describe('ReservationFiltersComponent', () => {
  let component: ReservationFiltersComponent;
  let fixture: ComponentFixture<ReservationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

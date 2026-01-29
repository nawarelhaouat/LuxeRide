import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { PopularOffersComponent } from './popular-offers.component';
import { OffersService } from '../../services/offers.service';
import { TrackService } from '../../services/track.service';
import { SelectedVehicleService } from '../../services/selected-vehicle.service';
import { Offer } from '../../models/offer.model';

describe('PopularOffersComponent', () => {
  let fixture: ComponentFixture<PopularOffersComponent>;
  let component: PopularOffersComponent;

  let offersService: jasmine.SpyObj<OffersService>;
  let trackService: jasmine.SpyObj<TrackService>;
  let selectedVehicle: jasmine.SpyObj<SelectedVehicleService>;
  let router: jasmine.SpyObj<Router>;

  const MOCK: Offer[] = [
    { id: '1', brand: 'Mercedes', model: 'AMG GT', pricePerDay: 4000, imageUrl: 'a.png' },
    { id: '2', brand: 'BMW', model: 'M4', pricePerDay: 2500, imageUrl: 'b.png' },
    { id: '3', brand: 'Audi', model: 'RS7', pricePerDay: 2800, imageUrl: 'c.png' },
  ];

  beforeEach(async () => {
    offersService = jasmine.createSpyObj('OffersService', ['getPopularOffers']);
    trackService = jasmine.createSpyObj('TrackService', ['reserveClick']);
    selectedVehicle = jasmine.createSpyObj('SelectedVehicleService', ['set']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PopularOffersComponent],
      providers: [
        { provide: OffersService, useValue: offersService },
        { provide: TrackService, useValue: trackService },
        { provide: SelectedVehicleService, useValue: selectedVehicle },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularOffersComponent);
    component = fixture.componentInstance;
  });

  it('doit charger les offres au init', () => {
    offersService.getPopularOffers.and.returnValue(of(MOCK));
    fixture.detectChanges();

    expect(component.offers.length).toBe(3);
    expect(component.loading).toBeFalse();
  });

  it('doit gérer une erreur backend', () => {
    offersService.getPopularOffers.and.returnValue(
      throwError(() => new Error('backend down'))
    );
    fixture.detectChanges();

    expect(component.offers.length).toBe(0);
    expect(component.loading).toBeFalse();
  });

  it('reserve() doit stocker id (string) et naviguer', () => {
    offersService.getPopularOffers.and.returnValue(of(MOCK));
    trackService.reserveClick.and.returnValue(of({ ok: true } as any));
    fixture.detectChanges();

    component.reserve(MOCK[0]);

    // ✅ CORRECTION ICI
    expect(selectedVehicle.set).toHaveBeenCalledWith('1');

    expect(router.navigate).toHaveBeenCalledWith(
      ['/reservation-client'],
      { state: { vehicle: MOCK[0] } }
    );
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { MOCK_OFFERS } from '../mocks/offers.mock';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class OffersService {

  // ✅ propriété de classe
  private apiUrl = 'http://localhost:8000/api/client';

  constructor(private http: HttpClient) {}

  getPopularOffers(): Observable<Offer[]> {
    // ✅ MODE MOCK
    if (environment.useMock) {
      console.log('USING MOCK DATA');
      return of(MOCK_OFFERS).pipe(delay(500));
    }

    // ✅ MODE BACKEND
    return this.http
    .get<any[]>(`${this.apiUrl}/voitures/most-rented`)
    .pipe(
      map(data =>
        data.map(item => ({
          id: item.id_voiture,
          brand: item.marque,                 // ✅ mapping ici
          model: '—',                         // backend ne le fournit pas
          pricePerDay: Number(item.prix_par_jour),
          imageUrl: item.image ?? 'assets/images/car.png'
        }))
      )
    );
}}

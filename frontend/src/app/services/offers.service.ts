import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { MOCK_OFFERS } from '../mocks/offers.mock';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OffersService {

  // ✅ propriété de classe
  private apiUrl = 'http://localhost:8080/api/client';

  constructor(private http: HttpClient) {}

  getPopularOffers(): Observable<Offer[]> {
    // ✅ MODE MOCK
    if (environment.useMock) {
      console.log('USING MOCK DATA');
      return of(MOCK_OFFERS).pipe(delay(500));
    }

    // ✅ MODE BACKEND
    return this.http.get<Offer[]>(
      `${this.apiUrl}/voitures/most-rented`
    );
  }
}

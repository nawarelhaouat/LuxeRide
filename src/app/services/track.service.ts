import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private api = 'http://localhost:8080/api/client';

  constructor(private http: HttpClient) {}

  reserveClick(vehicleId: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.api}/track/reserve-click`, {
      vehicleId,
    });
  }
}

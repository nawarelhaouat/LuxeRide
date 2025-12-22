import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardResponse } from '../models/dashboard.model';
//import { DASHBOARD_MOCK } from '../mocks/dashboard.mock';
//import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private readonly url = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardResponse> {
   return this.http.get<DashboardResponse>(this.url);
  }
  //getDashboard(): Observable<DashboardResponse> {
    //return of(DASHBOARD_MOCK); 
  //}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessInsightService {

  private apiUrl = 'http://localhost:8000/api/admin/business-insight';

  constructor(private http: HttpClient) {}

  getInsight(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private API = 'http://localhost:8000/api/admin/Reservation';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token'); // token admin
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  /* ================= GET ALL ================= */
  getAll(): Observable<Reservation[]> {
    return this.http.get<any>(this.API, this.headers()).pipe(
      map(res => res['0'].map((r: any) => this.mapReservation(r)))
    );
  }

  /* ================= FILTER ================= */
  filter(start?: string, end?: string): Observable<Reservation[]> {
    return this.http.get<any>(this.API, {
      ...this.headers(),
      params: {
        ...(start && { date_debut: start }),
        ...(end && { date_fin: end })
      }
    }).pipe(
      map(res => res['0'].map((r: any) => this.mapReservation(r)))
    );
  }

  /* ================= DETAILS ================= */
  getById(id: number): Observable<Reservation> {
    return this.http.get<any[]>(`${this.API}/${id}`, this.headers()).pipe(
      map(res => this.mapReservation(res[0]))
    );
  }

  /* ================= UPDATE STATUS ================= */
  updateStatus(id: number, status: 'valide' | 'non valide'): Observable<any> {
    return this.http.patch(
      `${this.API}/${id}`,
      { statut: status },
      this.headers()
    );
  }

  /* ================= MAPPER ================= */
  private mapReservation(r: any): Reservation {
    return {
      reference: `RES-${r.id_location}`,
      clientName: `${r.nom_client} ${r.prenom_client ?? ''}`,
      phone: r.telephone_client ?? '',
      cin: r.cin_client ?? '',
      carBrand: r.marque,
      carModel: r.modele,
      plate: r.immatriculation,
      startDate: r.date_debut ?? '',
      endDate: r.date_fin ?? '',
      reservationDate: r.date_reservation ?? '',
      totalPrice: Number(r.montant_total ?? 0),
      paymentMethod: '—',
      status: r.valide ?? r.statut
    };
  }
}

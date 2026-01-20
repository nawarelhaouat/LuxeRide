import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationClientService {

  // 🔴 URL DE BASE DE L’API LARAVEL
  private readonly API_URL = 'http://localhost:8000/api/locations';

  // 🔹 Prix (local, côté front)
  private readonly pricePerDay = 3500;

  constructor(private http: HttpClient) {}

  /* =====================================================
     PARTIE 1️⃣ — LOGIQUE FRONT (calculs)
     ===================================================== */

  getPricePerDay(): number {
    return this.pricePerDay;
  }

  calculateNumberOfDays(startDate: string, endDate: string): number {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  calculateTotalPrice(days: number): number {
    return days * this.pricePerDay;
  }

  /* =====================================================
     PARTIE 2️⃣ — APPELS BACKEND LARAVEL
     ===================================================== */

  /**
   * 🔹 Créer une réservation (POST)
   * Cette route doit exister côté Laravel :
   * POST /api/locations
   */
  createReservation(data: {
    nom_client: string;
    prenom_client: string;
    telephone_client: string;
    email_client: string;
    cin_client: string;
    date_debut: string;
    date_fin: string;
    montant_total: number;
    vehicle_id?: number;
  }): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * 🔹 Liste des locations (index)
   * GET /api/locations
   */
  getAllLocations(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * 🔹 Détail d’une location
   * GET /api/locations/{id}
   * ⚠️ Le backend renvoie un TABLEAU avec 1 objet
   */
  getLocationById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${id}`);
  }

  /**
   * 🔹 Mise à jour du statut
   * PUT /api/locations/{id}
   */
  updateStatus(
    id: number,
    statut: 'valide' | 'non valide'
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, { statut });
  }
}

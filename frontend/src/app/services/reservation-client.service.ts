import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationClientService {

  // 🔴 API Laravel
  private readonly API_URL = 'http://16.171.57.45/api/client/voitures/locations';

  constructor(private http: HttpClient) {}

  /* =====================================================
     PARTIE 1️⃣ — LOGIQUE FRONT (calculs)
     ===================================================== */

  /**
   * Calcul du nombre de jours
   */
  calculateNumberOfDays(startDate: string, endDate: string): number {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  /**
   * Calcul du prix total à partir du prix/jour réel
   */
  calculateTotalPrice(days: number, pricePerDay: number): number {
    if (days <= 0 || pricePerDay <= 0) return 0;
    return days * pricePerDay;
  }

  /* =====================================================
     PARTIE 2️⃣ — APPELS BACKEND LARAVEL
     ===================================================== */

  /**
   * Créer une réservation
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
    id_voiture: number; // ✅ NOM CORRECT
  }): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * Liste des locations
   */
  getAllLocations(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Détails d'une location
   */
  getLocationById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  /**
   * Mise à jour du statut
   */
  updateStatus(
    id: number,
    statut: 'valide' | 'non valide'
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, { statut });
  }
}

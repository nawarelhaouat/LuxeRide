import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({ providedIn: 'root' })
export class VehicleService {

  private api = 'http://localhost:8000/api/admin/voiture'; // <<< CORRECTION

  constructor(private http: HttpClient) {}

  private mapFromBackend(apiData: any): Vehicle {
    return {
      id: apiData.id_voiture,
      brand: apiData.marque,
      model: apiData.modele,
      plate: apiData.immatriculation,
      pricePerDay: Number(apiData.prix_par_jour),
      status: apiData.statut,
      image: apiData.image ?? null
    };
  }

  private mapToBackend(vehicle: Vehicle): any {
    return {
      price_per_day: vehicle.pricePerDay,
      status: vehicle.status
    };
  }

  private mapToBackendAdd(vehicle: Vehicle): any {
    return {
      brand: vehicle.brand,
    model: vehicle.model,
    plate_number: vehicle.plate,
    price_per_day: vehicle.pricePerDay,
    status: vehicle.status,
    id_admin: "ADM001"
    };
  }


  getAll(): Observable<Vehicle[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(list => list.map(item => this.mapFromBackend(item)))
    );
  }

  addVehicle(v: Vehicle): Observable<any> {
    return this.http.post(this.api, this.mapToBackendAdd(v));
  }

  updateVehicle(id: number, v: Vehicle): Observable<any> {
    return this.http.put(`${this.api}/${id}`, this.mapToBackend(v));
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

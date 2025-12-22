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
      id: apiData.id,
      brand: apiData.marque,
      model: apiData.modele,
      plate: apiData.immatriculation,
      pricePerDay: Number(apiData.prix_par_jour),
      status: apiData.statut,
      image: apiData.image_url ?? null
    };
  }

  private mapToBackend(vehicle: Vehicle): any {
    return {
      marque: vehicle.brand,
      modele: vehicle.model,
      immatriculation: vehicle.plate,
      prix_par_jour: vehicle.pricePerDay,
      statut: vehicle.status,
      id_admin: 1
    };
  }

  getAll(): Observable<Vehicle[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(list => list.map(item => this.mapFromBackend(item)))
    );
  }

  addVehicle(v: Vehicle): Observable<any> {
    return this.http.post(this.api, this.mapToBackend(v));
  }

  updateVehicle(id: number, v: Vehicle): Observable<any> {
    return this.http.put(`${this.api}/${id}`, this.mapToBackend(v));
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicles: Vehicle[] = [
    {
      id: 1,
      brand: 'BMW',
      model: 'Serie 3',
      plateNumber: 'AB-123-CD',
      pricePerDay: 85,
      status: 'Disponible',
      imageUrl: 'assets/images/vehicle1.jpg'
    },
    {
      id: 2,
      brand: 'Mercedes',
      model: 'C-Class',
      plateNumber: 'EF-456-GH',
      pricePerDay: 95,
      status: 'Loué',
      imageUrl: 'assets/images/vehicle2.jpg'
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4',
      plateNumber: 'IJ-789-KL',
      pricePerDay: 80,
      status: 'Maintenance',
      imageUrl: 'assets/images/vehicle3.jpg'
    }
  ];

  private subject = new BehaviorSubject<Vehicle[]>(this.vehicles);
  vehicles$ = this.subject.asObservable();

  getVehicles() {
    return this.vehicles$;
  }

  addVehicle(vehicle: Vehicle) {
    vehicle.id = Date.now();
    this.vehicles.push(vehicle);
    this.subject.next(this.vehicles);
  }

  updateVehicle(updated: Vehicle) {
    const index = this.vehicles.findIndex(v => v.id === updated.id);
    this.vehicles[index] = updated;
    this.subject.next(this.vehicles);
  }

  deleteVehicle(id: number) {
    this.vehicles = this.vehicles.filter(v => v.id !== id);
    this.subject.next(this.vehicles);
  }

  getVehicle(id: number) {
    return this.vehicles.find(v => v.id === id);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vehicle } from '../../models/vehicle';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';
import { VehicleModalComponent } from './modals/vehicle-modal/vehicle-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    VehicleTableComponent,
    VehicleModalComponent,
    DeleteModalComponent
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {

  // -------------------------
  //   DÉMO (3 véhicules)
  // -------------------------
  vehicles: Vehicle[] = [
    {
      id: '1',
      brand: 'BMW',
      model: 'Serie 3',
      plate: 'AB-123-CD',
      pricePerDay: 85,
      status: 'available',
      image: 'assets/cars/bmw.jpg'
    },
    {
      id: '2',
      brand: 'Mercedes',
      model: 'C-Class',
      plate: 'EF-456-GH',
      pricePerDay: 95,
      status: 'rented',
      image: 'assets/cars/mercedes.jpg'
    },
    {
      id: '3',
      brand: 'Audi',
      model: 'A4',
      plate: 'IJ-789-KL',
      pricePerDay: 80,
      status: 'maintenance',
      image: 'assets/cars/audi.jpg'
    }
  ];

  filteredVehicles = [...this.vehicles];
  status = 'all';

  // MODALS
  showFormModal = false;
showDeleteModal = false;

selectedVehicle: Vehicle | null = null;
vehicleToDelete: Vehicle | null = null;

  // ---------------------------
  // FILTRE
  // ---------------------------
  filter(status: string) {
    this.status = status;

    if (status === 'all') {
      this.filteredVehicles = [...this.vehicles];
    } else {
      this.filteredVehicles = this.vehicles.filter(v => v.status === status);
    }
  }

  // ---------------------------
  // AJOUTER
  // ---------------------------
  openAddModal() {
    this.selectedVehicle = null;
    this.showFormModal = true;
  }

  // ---------------------------
  // MODIFIER
  // ---------------------------
  openEditModal(v: Vehicle) {
    this.selectedVehicle = { ...v };
    this.showFormModal = true;
  }

  saveVehicle(v: Vehicle) {

    if (this.selectedVehicle) {
      // EDIT
      const index = this.vehicles.findIndex(x => x.id === v.id);
      this.vehicles[index] = v;
    } else {
      // ADD
      this.vehicles.push(v);
    }

    this.filter(this.status);
    this.showFormModal = false;
  }

  // ---------------------------
  // SUPPRIMER
  // ---------------------------
 openDeleteModal(v: Vehicle) {
  console.log('DELETE CLICK EVENT = ', v);
  this.vehicleToDelete = v;
  this.showDeleteModal = true;
}


  confirmDelete() {
    this.vehicles = this.vehicles.filter(v => v.id !== this.vehicleToDelete!.id);
    this.filter(this.status);
    this.showDeleteModal = false;
  }
}

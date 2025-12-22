import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

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
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];

  status = 'all';

  // MODALS
  showFormModal = false;
  showDeleteModal = false;

  selectedVehicle: Vehicle | null = null;
  vehicleToDelete: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAll().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
      },
      error: (err) => console.error('Load error:', err)
    });
  }

  // ---------------------------
  // FILTER
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
  // ADD
  // ---------------------------
  openAddModal() {
    this.selectedVehicle = null;
    this.showFormModal = true;
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicleService.addVehicle(vehicle).subscribe({
      next: () => this.loadVehicles(),
      error: (err) => console.error('Add error:', err)
    });
  }

  // ---------------------------
  // EDIT
  // ---------------------------
  openEditModal(v: Vehicle) {
    this.selectedVehicle = { ...v };
    this.showFormModal = true;
  }

  updateVehicle(v: Vehicle) {
    this.vehicleService.updateVehicle(v.id!, v).subscribe({

      next: () => this.loadVehicles(),
      error: (err) => console.error('Update error:', err)
    });
  }

  saveVehicle(v: Vehicle) {
    if (this.selectedVehicle) {
      this.updateVehicle(v);
    } else {
      this.addVehicle(v);
    }
    this.showFormModal = false;
  }

  // ---------------------------
  // DELETE
  // ---------------------------
  openDeleteModal(v: Vehicle) {
    this.vehicleToDelete = v;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.vehicleToDelete) return;

    this.vehicleService.deleteVehicle(this.vehicleToDelete!.id!).subscribe({

      next: () => this.loadVehicles(),
      error: (err) => console.error('Delete error:', err)
    });

    this.showDeleteModal = false;
  }
}

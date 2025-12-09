import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

import { AddVehicleModalComponent } from './modals/add-vehicle-modal/add-vehicle-modal.component';
import { EditVehicleModalComponent } from './modals/edit-vehicle-modal/edit-vehicle-modal.component';
import { DeleteVehicleModalComponent } from './modals/delete-vehicle-modal/delete-vehicle-modal.component';

// ❗ CHEMIN CORRIGÉ
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  imports: [
    NgIf,
    NgFor,
    AddVehicleModalComponent,
    EditVehicleModalComponent,
    DeleteVehicleModalComponent,
    StatusBadgeComponent
  ]
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  selectedFilter = 'Tous';

  showAdd = false;
  showEdit = false;
  showDelete = false;

  selectedVehicleId: number | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(v => {
      this.vehicles = v;
      this.filteredVehicles = v;
    });
  }

  filter(status: string) {
    this.selectedFilter = status;
    this.filteredVehicles =
      status === 'Tous'
        ? this.vehicles
        : this.vehicles.filter(v => v.status === status);
  }

  openAdd() {
    this.showAdd = true;
  }

  openEdit(id: number) {
    this.selectedVehicleId = id;
    this.showEdit = true;
  }

  openDelete(id: number) {
    this.selectedVehicleId = id;
    this.showDelete = true;
  }

  closeModals() {
    this.showAdd = false;
    this.showEdit = false;
    this.showDelete = false;
  }
}

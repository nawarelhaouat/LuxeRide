import { Component, EventEmitter, Output } from '@angular/core';
import { VehicleService } from '../../../../services/vehicle.service';
import { Vehicle } from '../../../../models/vehicle.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle-modal',
  standalone: true,
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.css'],
  imports: [ FormsModule ]
})

export class AddVehicleModalComponent {

  @Output() close = new EventEmitter<void>();

  vehicle: Partial<Vehicle> = {
    brand: '',
    model: '',
    plateNumber: '',
    pricePerDay: 0,
    status: 'Disponible',
    imageUrl: ''
  };

  constructor(private vehicleService: VehicleService) {}

  addVehicle() {
    this.vehicleService.addVehicle(this.vehicle as Vehicle);
    this.close.emit();
  }
}

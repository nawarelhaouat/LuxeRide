import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleService } from '../../../../services/vehicle.service';

@Component({
  selector: 'app-delete-vehicle-modal',
  templateUrl: './delete-vehicle-modal.component.html',
  styleUrls: ['./delete-vehicle-modal.component.css']
})
export class DeleteVehicleModalComponent {

  @Input() vehicleId!: number;
  @Output() close = new EventEmitter<void>();

  constructor(private vehicleService: VehicleService) {}

  confirmDelete() {
    this.vehicleService.deleteVehicle(this.vehicleId);
    this.close.emit();
  }
}

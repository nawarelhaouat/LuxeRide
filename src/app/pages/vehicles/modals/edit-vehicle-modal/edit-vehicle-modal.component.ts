import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehicleService } from '../../../../services/vehicle.service';
import { Vehicle } from '../../../../models/vehicle.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-vehicle-modal',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './edit-vehicle-modal.component.html',
  styleUrls: ['./edit-vehicle-modal.component.css']
})
export class EditVehicleModalComponent implements OnInit {

  @Input() vehicleId!: number;
  @Output() close = new EventEmitter<void>();

  vehicle!: Vehicle;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicle = { ...(this.vehicleService.getVehicle(this.vehicleId) as Vehicle) };
  }

  saveChanges() {
    this.vehicleService.updateVehicle(this.vehicle);
    this.close.emit();
  }
}

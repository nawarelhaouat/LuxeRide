import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../models/vehicle';

@Component({
  selector: 'app-vehicle-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.css']
})
export class VehicleTableComponent {

  @Input() vehicles: Vehicle[] = [];

  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<Vehicle>();

  getStatusClass(status: string): string {
  switch (status) {
    case 'disponible':
      return 'badge green';
    case 'loue':
      return 'badge blue';
    case 'en_maintenance':
      return 'badge orange';
    default:
      return 'badge';
  }
}

}

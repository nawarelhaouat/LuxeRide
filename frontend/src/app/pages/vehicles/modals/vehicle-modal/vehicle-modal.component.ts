import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../../../models/vehicle';

@Component({
  selector: 'app-vehicle-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.css']
})
export class VehicleModalComponent implements OnChanges {

  @Input() vehicle: Vehicle | null = null;
  @Input() open = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Vehicle>();

  // ⭐ IMPORTANT : plus d'id ici !
  form = {
    brand: '',
    model: '',
    plate: '',
    pricePerDay: 0,
    status: 'available',
    image: ''
  };

  ngOnChanges() {
    if (this.vehicle) {
      // Mode édition → remplir avec les valeurs existantes
      this.form = {
        brand: this.vehicle.brand,
        model: this.vehicle.model,
        plate: this.vehicle.plate,
        pricePerDay: this.vehicle.pricePerDay,
        status: this.vehicle.status,
        image: this.vehicle.image ?? ''
      };
    } else {
      // Mode ajout → formulaire vide
      this.form = {
        brand: '',
        model: '',
        plate: '',
        pricePerDay: 0,
        status: 'disponible',
        image: ''
      };
    }
  }

  submit() {
    if (this.vehicle) {
      this.save.emit({ ...this.form, id: this.vehicle.id });
    } else {
      this.save.emit({ ...this.form });
    }

  }
}

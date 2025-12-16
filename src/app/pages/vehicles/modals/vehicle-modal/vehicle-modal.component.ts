import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

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

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter<Vehicle>();

  form: Vehicle = {
    id: '',
    brand: '',
    model: '',
    plate: '',
    pricePerDay: 0,
    status: 'available',
    image: ''
  };

  ngOnChanges(changes: SimpleChanges) {
  if (changes['vehicle']) {
    if (this.vehicle) {
      this.form = { ...this.vehicle };
    } else {
      this.form = {
        id: crypto.randomUUID(),
        brand: '',
        model: '',
        plate: '',
        pricePerDay: 0,
        status: 'available',
        image: ''
      };
    }
  }
}


  submit() {
    this.save.emit(this.form);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export type VehicleSearchParams = {
  startDate: Date | null;
  endDate: Date | null;
  price: string;
};

@Component({
  selector: 'app-vehicle-filter',
  standalone: true, // ✅ IMPORTANT
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.css'],
  imports: [
    CommonModule,
    FormsModule,          // ✅ pour ngModel
    MatFormFieldModule,   // ✅ mat-form-field
    MatInputModule,       // ✅ matInput
    MatDatepickerModule,  // ✅ matDatepicker
    MatNativeDateModule ,
    MatSelectModule   // ✅ adapter Date natif
  ]
})
export class VehicleFilterComponent {
  @Output() search = new EventEmitter<VehicleSearchParams>();

  startDate: Date | null = null;
  endDate: Date | null = null;
  price = '';

  today = new Date();

  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const min = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    return day >= min;
  };

  submit() {
    this.search.emit({ startDate: this.startDate, endDate: this.endDate, price: this.price });
  }
}

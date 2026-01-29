import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reservation-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-filters.component.html',
  styleUrls: ['./reservation-filters.component.css']
})
export class ReservationFiltersComponent {

  startDate: string = '';
  endDate: string = '';

  @Output() filter = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  applyFilter() {
    this.filter.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}

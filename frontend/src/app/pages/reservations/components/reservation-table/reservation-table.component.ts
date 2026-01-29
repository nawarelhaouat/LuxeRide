import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../../models/reservation';

@Component({
  selector: 'app-reservation-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent {
  @Input() reservations: Reservation[] = [];
  @Output() changeStatus = new EventEmitter<Reservation>();
  @Output() viewDetails = new EventEmitter<Reservation>();
}

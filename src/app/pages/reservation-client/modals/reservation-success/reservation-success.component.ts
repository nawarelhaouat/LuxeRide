import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.css']
})
export class ReservationSuccessComponent {
  @Output() close = new EventEmitter<void>();
}

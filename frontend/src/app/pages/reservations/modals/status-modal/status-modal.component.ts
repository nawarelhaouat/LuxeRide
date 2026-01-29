import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation, ReservationStatus } from '../../../../models/reservation';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatusModalComponent implements OnInit {

  @Input() reservation!: Reservation;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<ReservationStatus>();

  selectedStatus!: ReservationStatus;

  ngOnInit(): void {
    this.selectedStatus = this.reservation.status;
  }
}

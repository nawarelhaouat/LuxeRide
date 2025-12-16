import { Component, Input, Output, EventEmitter ,ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../../models/reservation';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class StatusModalComponent {
  @Input() reservation!: Reservation;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<Reservation['status']>();

  selectedStatus!: Reservation['status'];

  ngOnInit() {
    this.selectedStatus = this.reservation.status;
  }
}

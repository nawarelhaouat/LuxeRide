import { Component, Input, Output, EventEmitter ,ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../../models/reservation';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsModalComponent {

  @Input() reservation!: Reservation;

  @Output() close = new EventEmitter<void>();

}

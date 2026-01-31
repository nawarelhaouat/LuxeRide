import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../../models/vehicle';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnChanges {

  @Input() open = false;
  @Input() vehicle!: Vehicle | null;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
      // juste pour debug, on verra le changement
      console.log('OPEN = ', this.open, ' VEHICLE = ', this.vehicle);
  }
}

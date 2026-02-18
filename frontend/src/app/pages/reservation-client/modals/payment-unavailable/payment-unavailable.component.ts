import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-unavailable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-unavailable.component.html',
  styleUrls: ['./payment-unavailable.component.css']
})
export class PaymentUnavailableComponent {
  @Output() close = new EventEmitter<void>();
}
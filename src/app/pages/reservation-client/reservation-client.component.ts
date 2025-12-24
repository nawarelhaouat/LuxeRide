import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReservationClientService } from '../../services/reservation-client.service';

// ✅ IMPORT DES MODALS
import { PaymentUnavailableComponent } from './modals/payment-unavailable/payment-unavailable.component';
import { ReservationSuccessComponent } from './modals/reservation-success/reservation-success.component';

@Component({
  selector: 'app-reservation-client',
  standalone: true,

  // ✅ OBLIGATOIRE EN STANDALONE
  imports: [
    CommonModule,
    FormsModule,
    PaymentUnavailableComponent,
    ReservationSuccessComponent
  ],

  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent {

  pricePerDay = 0;

  startDate!: string;
  endDate!: string;
  numberOfDays = 0;
  totalPrice = 0;

  paymentMethod: 'ONLINE' | 'AGENCY' | null = null;

  showPaymentUnavailable = false;
  showReservationSuccess = false;

  constructor(
    private reservationClientService: ReservationClientService,
    private router: Router
  ) {
    this.pricePerDay = this.reservationClientService.getPricePerDay();
  }

  calculatePrice(): void {
    this.numberOfDays =
      this.reservationClientService.calculateNumberOfDays(
        this.startDate,
        this.endDate
      );

    this.totalPrice =
      this.reservationClientService.calculateTotalPrice(this.numberOfDays);
  }

  selectPayment(method: 'ONLINE' | 'AGENCY'): void {
    this.paymentMethod = method;
  }

  reserve(): void {
    if (this.paymentMethod === 'ONLINE') {
      this.showPaymentUnavailable = true;
      return;
    }

    if (this.paymentMethod === 'AGENCY') {
      this.showReservationSuccess = true;
    }
  }

  goBack(): void {
    this.router.navigate(['/vehicles-client']);
  }
}

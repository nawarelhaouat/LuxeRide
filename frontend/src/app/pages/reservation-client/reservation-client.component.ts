import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ReservationClientService } from '../../services/reservation-client.service';

// ✅ MODALS
import { PaymentUnavailableComponent } from './modals/payment-unavailable/payment-unavailable.component';
import { ReservationSuccessComponent } from './modals/reservation-success/reservation-success.component';

@Component({
  selector: 'app-reservation-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    PaymentUnavailableComponent,
    ReservationSuccessComponent
  ],
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css']
})
export class ReservationClientComponent {

  // 🚗 Voiture sélectionnée (reçue depuis popular-offers)
  vehicle: any;

  // 💰 Tarification
  pricePerDay = 0;
  numberOfDays = 0;
  totalPrice = 0;

  // 📅 Dates
  startDate!: string;
  endDate!: string;

  // 💳 Paiement
  paymentMethod: 'ONLINE' | 'AGENCY' | null = null;

  // 🪟 Modals
  showPaymentUnavailable = false;
  showReservationSuccess = false;

  constructor(
    private reservationClientService: ReservationClientService,
    private router: Router
  ) {
    // ✅ Récupération de la voiture envoyée par PopularOffersComponent
    this.vehicle = history.state.vehicle;
   console.log( "VEHICUUUULE",this.vehicle )
    if (!this.vehicle) {
      // Sécurité : accès direct ou refresh
      this.router.navigate(['/vehicules-client']);
      return;
    }

    // ✅ Prix réel de la voiture sélectionnée
    this.pricePerDay = this.vehicle.pricePerDay;
  }

  // 🧮 Calcul automatique prix & jours
  calculatePrice(): void {
    this.numberOfDays =
      this.reservationClientService.calculateNumberOfDays(
        this.startDate,
        this.endDate
      );

    this.totalPrice =
  this.reservationClientService.calculateTotalPrice(
    this.numberOfDays,
    this.pricePerDay
  );

  }

  // 💳 Sélection mode de paiement
  selectPayment(method: 'ONLINE' | 'AGENCY'): void {
    this.paymentMethod = method;
  }

  // ✅ Réservation
  reserve(): void {
    if (!this.startDate || !this.endDate || this.numberOfDays <= 0) {
      alert('Veuillez sélectionner des dates valides.');
      return;
    }

    if (!this.paymentMethod) {
      alert('Veuillez choisir un mode de paiement.');
      return;
    }

    if (this.paymentMethod === 'ONLINE') {
      this.showPaymentUnavailable = true;
      return;
    }

    // 💾 Envoi vers le backend (paiement à l’agence)
    this.reservationClientService.createReservation({
      nom_client: 'Client',          // à remplacer par formulaire
      prenom_client: 'Test',
      telephone_client: '0600000000',
      email_client: 'client@test.com',
      cin_client: 'XX12345',
      date_debut: this.startDate,
      date_fin: this.endDate,
      montant_total: this.totalPrice,
      id_voiture: this.vehicle.id     // ⚠️ IMPORTANT
    }).subscribe({
      next: () => {
        this.showReservationSuccess = true;
      },
      error: (err) => {
        console.error('Erreur réservation:', err);
        alert('Erreur lors de la réservation.');
      }
    });
  }

  // 🔙 Retour liste véhicules
  goBack(): void {
    this.router.navigate(['/vehicules-client']);
  }
}

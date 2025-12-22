import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';

import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ReservationFiltersComponent } from './components/reservation-filters/reservation-filters.component';
import { StatusModalComponent } from './modals/status-modal/status-modal.component';
import { DetailsModalComponent } from './modals/details-modal/details-modal.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    ReservationTableComponent,
    ReservationFiltersComponent,
    StatusModalComponent,
    DetailsModalComponent
  ],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  selectedReservation?: Reservation;
  showStatusModal = false;
  showDetailsModal = false;

  constructor(private reservationService: ReservationService) {}

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.loadReservations();
  }

  /* ================= LOAD ================= */

  loadReservations(): void {
    this.reservationService.getAll().subscribe({
      next: data => {
        this.reservations = data;
      },
      error: err => {
        console.error('Erreur chargement réservations', err);
      }
    });
  }

  /* ================= MODALS ================= */

  openStatusModal(res: Reservation): void {
    this.selectedReservation = res;
    this.showStatusModal = true;
  }

  openDetailsModal(res: Reservation): void {
    const id = this.extractId(res.reference);

    this.reservationService.getById(id).subscribe({
      next: data => {
        this.selectedReservation = data;
        this.showDetailsModal = true;
      },
      error: err => console.error(err)
    });
  }

  /* ================= UPDATE STATUS ================= */

  updateStatus(status: Reservation['status']): void {
    if (!this.selectedReservation) return;

    const id = this.extractId(this.selectedReservation.reference);

    this.reservationService.updateStatus(id, status).subscribe({
      next: () => {
        this.selectedReservation!.status = status;
        this.showStatusModal = false;
      },
      error: err => console.error(err)
    });
  }

  /* ================= FILTER ================= */

  onFilter(event: { startDate: string; endDate: string }): void {
    this.reservationService
      .filter(event.startDate, event.endDate)
      .subscribe({
        next: data => {
          this.reservations = data;
        },
        error: err => console.error(err)
      });
  }

  /* ================= UTILS ================= */

  private extractId(reference: string): number {
    // Exemple: RES-1 ou RES001 → 1
    return Number(reference.replace(/\D/g, ''));
  }
}

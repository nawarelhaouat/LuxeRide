import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation';
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
export class ReservationsComponent {

  reservations: Reservation[] = [
    {
      reference: 'RES001',
      clientName: 'Ahmed Bennani',
      phone: '+212 6 12 34 56 78',
      cin: 'AB123456',
      carBrand: 'BMW',
      carModel: 'Serie 3',
      plate: 'AB-123-CD',
      startDate: '2024-12-10',
      endDate: '2024-12-15',
      reservationDate: '2024-12-05',
      totalPrice: 425,
      paymentMethod: 'Carte Bancaire',
      status: 'confirmée'
    },
    {
      reference: 'RES002',
      clientName: 'Fatima El Ouardi',
      phone: '+212 6 98 76 54 32',
      cin: 'EF456789',
      carBrand: 'Mercedes',
      carModel: 'C-Class',
      plate: 'EF-456-GH',
      startDate: '2024-12-12',
      endDate: '2024-12-18',
      reservationDate: '2024-12-07',
      totalPrice: 600,
      paymentMethod: 'Espèces',
      status: 'en attente'
    }
  ];

  selectedReservation?: Reservation;
  showStatusModal = false;
  showDetailsModal = false;

  openStatusModal(res: Reservation) {
    this.selectedReservation = res;
    this.showStatusModal = true;
  }

  openDetailsModal(res: Reservation) {
    this.selectedReservation = res;
    this.showDetailsModal = true;
  }

  updateStatus(status: Reservation['status']) {
    if (this.selectedReservation) {
      this.selectedReservation.status = status;
    }
    this.showStatusModal = false;
  }
  onFilter(event: { startDate: string; endDate: string }) {
  this.reservations = this.reservations.filter(r => {
    const start = new Date(r.startDate).getTime();
    const end = new Date(r.endDate).getTime();

    const filterStart = event.startDate
      ? new Date(event.startDate).getTime()
      : null;

    const filterEnd = event.endDate
      ? new Date(event.endDate).getTime()
      : null;

    return (
      (!filterStart || start >= filterStart) &&
      (!filterEnd || end <= filterEnd)
    );
  });
}
}

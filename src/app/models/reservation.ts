export interface Reservation {
  reference: string;
  clientName: string;
  phone: string;
  cin: string;

  carBrand: string;
  carModel: string;
  plate: string;

  startDate: string;
  endDate: string;
  reservationDate: string;

  totalPrice: number;
  paymentMethod: string;

  status: 'confirmée' | 'en attente' | 'annulée';
}

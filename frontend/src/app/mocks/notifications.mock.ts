import { NotificationDto } from '../models/notification.model';

export const NOTIFICATIONS_MOCK: NotificationDto[] = [
  {
    id: 1,
    text: 'Nouvelle réservation créée pour Audi A4',
    time: "À l'instant",
    read: false
  },
  {
    id: 2,
    text: 'Nouvelle réservation créée pour Mercedes C-Class',
    time: 'Il y a 5 minutes',
    read: false
  },
  {
    id: 3,
    text: 'Paiement reçu pour réservation BMW Série 3',
    time: 'Il y a 1 heure',
    read: false
  },
  {
    id: 4,
    text: 'Véhicule Peugeot 208 envoyé en maintenance',
    time: 'Hier',
    read: true
  }
];

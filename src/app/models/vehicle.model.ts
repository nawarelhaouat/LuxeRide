export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  plateNumber: string;
  pricePerDay: number;
  status: 'Disponible' | 'Loué' | 'Maintenance';
  imageUrl: string;
}

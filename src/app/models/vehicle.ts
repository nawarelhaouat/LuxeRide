export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate: string;
  pricePerDay: number;
  status: 'available' | 'rented' | 'maintenance';
  image: string;
}

export interface Vehicle {
  id?: number;                        // facultatif
  brand: string;
  model: string;
  plate: string;
  pricePerDay: number;
  status: string;                     // string pour compatibilité backend
  image: string | null;
}

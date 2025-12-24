import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationClientService {

  private readonly pricePerDay = 3500;

  constructor() {}

  calculateNumberOfDays(startDate: string, endDate: string): number {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  calculateTotalPrice(numberOfDays: number): number {
    return numberOfDays * this.pricePerDay;
  }

  getPricePerDay(): number {
    return this.pricePerDay;
  }
}

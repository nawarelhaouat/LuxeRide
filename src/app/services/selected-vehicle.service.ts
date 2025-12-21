import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelectedVehicleService {
  private key = 'selectedVehicleId';

  set(id: string) {
    sessionStorage.setItem(this.key, id);
  }

  get(): string | null {
    return sessionStorage.getItem(this.key);
  }

  clear() {
    sessionStorage.removeItem(this.key);
  }
}

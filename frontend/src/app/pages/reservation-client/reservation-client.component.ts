import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedVehicleService } from '../../services/selected-vehicle.service';

@Component({
  selector: 'app-reservation-client',
  standalone: true,
  templateUrl: './reservation-client.component.html',
})
export class ReservationClientComponent implements OnInit {
  vehicleId?: string;

  constructor(private router: Router, private selectedVehicle: SelectedVehicleService) {}

  ngOnInit(): void {
    const id = this.selectedVehicle.get();
    if (!id) {
      // si user ouvre la page direct
      this.router.navigate(['/vehicules-client']);
      return;
    }
    this.vehicleId = id;

    // Ici tu peux appeler backend GET /vehicles/:id si tu veux afficher détails
  }
}

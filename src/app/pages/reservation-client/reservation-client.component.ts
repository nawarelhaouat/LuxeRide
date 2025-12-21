import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  styleUrls: ['./reservation-client.component.css'],
})
export class ReservationClientComponent implements OnInit {

  vehicleId!: string;
  vehicle: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 🔹 ID depuis l’URL
    this.vehicleId = this.route.snapshot.paramMap.get('id')!;

    // 🔹 Données passées depuis la page précédente (optionnel)
    this.vehicle = history.state?.vehicle;

    // 🔹 Cas réel backend (plus tard)
    // this.vehicleService.getById(this.vehicleId).subscribe(...)
  }
}

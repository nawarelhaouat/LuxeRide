import { Routes } from '@angular/router';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehiclesComponent },
  {path: 'reservations',component: ReservationsComponent},
];

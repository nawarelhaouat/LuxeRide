import { Routes } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { VehiculesClientComponent } from './pages/vehicules-client/vehicules-client.component';
import { ReservationClientComponent } from './pages/reservation-client/reservation-client.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';

export const routes: Routes = [

  // 🔹 Client pages
  { path: 'client', component: LandingComponent },
  { path: 'vehicules-client', component: VehiculesClientComponent },
  { path: 'reservation-client', component: ReservationClientComponent },

  // 🔹 Auth
  { path: '', component: LoginComponent },

  // 🔹 Admin layout
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'admin/dashboard', component: DashboardComponent },
      { path: 'admin/vehicles', component: VehiclesComponent },
      { path: 'admin/reservations', component: ReservationsComponent },
    ],
  },

  // 🔹 Default redirect
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 🔹 Fallback
  { path: '**', redirectTo: '/login' },
];


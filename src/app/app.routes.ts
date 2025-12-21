import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { VehiculesClientComponent } from './pages/vehicules-client/vehicules-client.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservationClientComponent } from './pages/reservation-client/reservation-client.component';

export const routes: Routes = [
  { path: 'client', component: LandingComponent },
  { path: 'login', component: LoginComponent },

  // ✅ Layout admin
  {
    path: 'admin',
    component: SidebarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
    
    ],
  },
{ path: 'vehicules-client', component: VehiculesClientComponent },
  { path: 'reservation-client', component: ReservationClientComponent },

  { path: '**', redirectTo: '/client' },
];

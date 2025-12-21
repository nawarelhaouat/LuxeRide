import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

import { VehicleFilterComponent, VehicleSearchParams } from '../vehicle-filter/vehicle-filter.component';

@Component({
  selector: 'app-hero-section',
  standalone: true, // ✅ OBLIGATOIRE
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [
    CommonModule,
    RouterModule,          // ✅ pas Router
    VehicleFilterComponent ,
    RevealOnScrollDirective, // ✅ pour <app-vehicle-filter>
  ]
})
export class HeroSectionComponent {

  constructor(private router: Router) {} // ✅ injecter

  onSearch(data: VehicleSearchParams) {
    this.router.navigate(['/vehicules-client'], {
      queryParams: {
        start: data.startDate ? data.startDate.toISOString().slice(0, 10) : null,
        end: data.endDate ? data.endDate.toISOString().slice(0, 10) : null,
        price: data.price || null
      }
    });
  }
}

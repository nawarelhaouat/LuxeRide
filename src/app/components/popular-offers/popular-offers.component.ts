import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { OffersService } from '../../services/offers.service';
import { TrackService } from '../../services/track.service';
import { SelectedVehicleService } from '../../services/selected-vehicle.service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-popular-offers',
  standalone: true,
  templateUrl: './popular-offers.component.html',
  styleUrls: ['./popular-offers.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    RevealOnScrollDirective
  ],
})
export class PopularOffersComponent implements OnInit, OnDestroy {

  offers: Offer[] = [];
  index = 0;
  pageSize = 3;
  loading = false;

  private sub?: Subscription;

  constructor(
    private router: Router,
    private offersApi: OffersService,
    private trackApi: TrackService,
    private selectedVehicle: SelectedVehicleService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.sub = this.offersApi.getPopularOffers().subscribe({
      next: (data) => {
        console.log('OFFERS REÇUES :', data); // ✅ log AU BON ENDROIT
        this.offers = data ?? [];
        this.index = 0;
        this.updatePageSize();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur offers:', err);
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe(); // ✅ évite memory leak
  }

  @HostListener('window:resize')
  onResize() {
    this.updatePageSize();
  }

  updatePageSize() {
    this.pageSize = window.innerWidth <= 900 ? 1 : 3;
    this.index = Math.min(
      this.index,
      Math.max(0, this.offers.length - this.pageSize)
    );
  }

  get visibleOffers(): Offer[] {
    if (!this.offers.length) return [];

    return Array.from({ length: this.pageSize }, (_, i) =>
      this.offers[(this.index + i) % this.offers.length]
    );
  }

  prev() {
    if (!this.offers.length) return;
    this.index = (this.index - 1 + this.offers.length) % this.offers.length;
  }

  next() {
    if (!this.offers.length) return;
    this.index = (this.index + 1) % this.offers.length;
  }

  formatMAD(v: number) {
    return new Intl.NumberFormat('fr-FR').format(v) + ' MAD';
  }

  goAll() {
    this.router.navigate(['/vehicules-client']);
  }

  reserve(offer: Offer) {
    this.selectedVehicle.set(offer.id);

    this.trackApi.reserveClick(offer.id).subscribe({
      next: () => {
        this.router.navigate(['/reservation-client'], {
          state: { vehicle: offer }
        });
      },
      error: () => {
        // même en erreur, on continue
        this.router.navigate(['/reservation-client'], {
          state: { vehicle: offer }
        });
      }
    });
  }

  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = 'assets/images/car.png';
  }
}

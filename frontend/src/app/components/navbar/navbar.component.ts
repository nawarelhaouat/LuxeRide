import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

type ActiveLink = 'Accueil' | 'Vehicules' | 'About' | 'Services' | 'Contact';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule],
})
export class NavbarComponent implements OnDestroy {
  isScrolled = false;
  activeLink: ActiveLink = 'Accueil';

  private sub: Subscription;
  private headerOffset = 90; // hauteur navbar (ajuste si besoin)

  constructor(private router: Router) {
    // ✅ À chaque navigation, on recalcule l'active link (après que le DOM soit prêt)
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.updateActiveByScroll(), 50);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
    this.updateActiveByScroll();
  }

  // ✅ Accueil = /client + scroll top
  goHome() {
    this.activeLink = 'Accueil';
    this.router.navigateByUrl('/client').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ✅ Aller à une section (si pas sur /client → y aller d'abord)
  goSection(sectionId: 'about' | 'services' | 'contact') {
    const map: Record<typeof sectionId, ActiveLink> = {
      about: 'About',
      services: 'Services',
      contact: 'Contact',
    };

    this.activeLink = map[sectionId];

    if (this.router.url !== '/client') {
      this.router.navigateByUrl('/client').then(() => {
        setTimeout(() => this.scrollTo(sectionId), 150);
      });
    } else {
      this.scrollTo(sectionId);
    }
  }

  goVehicules() {
    this.activeLink = 'Vehicules';
    this.router.navigateByUrl('/vehicules-client');
  }

  private scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - this.headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /**
   * ✅ Met à jour le lien actif selon la position de scroll
   * Marche mieux que IntersectionObserver dans ton cas.
   */
  private updateActiveByScroll() {
    // On ne calcule les sections QUE sur /client
    if (this.router.url !== '/client') {
      this.activeLink = 'Vehicules';
      return;
    }

    const about = document.getElementById('about');
    const services = document.getElementById('services');
    const contact = document.getElementById('contact');

    // Si pas encore rendu → stop
    if (!about || !services || !contact) return;

    const y = window.scrollY + this.headerOffset + 10;

    const aboutTop = about.offsetTop;
    const servicesTop = services.offsetTop;
    const contactTop = contact.offsetTop;

    // ✅ ordre: Contact > Services > About > Accueil
    if (y >= contactTop) {
      this.activeLink = 'Contact';
    } else if (y >= servicesTop) {
      this.activeLink = 'Services';
    } else if (y >= aboutTop) {
      this.activeLink = 'About';
    } else {
      this.activeLink = 'Accueil';
    }
  }
}

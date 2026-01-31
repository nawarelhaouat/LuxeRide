import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [RouterModule],
})
export class FooterComponent {
  year = new Date().getFullYear();
 isScrolled = false;
  activeLink = 'Accueil';

  constructor(private router: Router) {}

  /* Scroll navbar effect */      
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  /* Marquer lien actif */
  setActive(link: string) {
    this.activeLink = link;
  }

  /* Accueil = landing + scroll top */
  goHome() {
    this.activeLink = 'Accueil';
    this.router.navigateByUrl('/').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Scroll vers section */
  goSection(sectionId: string) {
    this.activeLink =
      sectionId === 'about' ? 'About' :
      sectionId === 'services' ? 'Services' :
      'Contact';

    // si on n'est PAS sur landing → y aller d'abord
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => this.scrollTo(sectionId), 300);
      });
    } else {
      this.scrollTo(sectionId);
    }
  }

  private scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

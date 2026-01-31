import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { PopularOffersComponent } from '../../components/popular-offers/popular-offers.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
@Component({
  selector: 'app-landing',
  imports: [NavbarComponent, HeroSectionComponent, PopularOffersComponent,FooterComponent,ContactComponent, RevealOnScrollDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

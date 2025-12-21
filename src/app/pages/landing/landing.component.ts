import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { PopularOffersComponent } from '../../components/popular-offers/popular-offers.component';
@Component({
  selector: 'app-landing',
  imports: [NavbarComponent, HeroSectionComponent, PopularOffersComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

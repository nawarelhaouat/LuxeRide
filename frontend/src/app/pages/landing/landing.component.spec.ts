import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LandingComponent } from './landing.component';
import { ActivatedRoute } from '@angular/router';

/* ===== MOCKS STANDALONE ===== */

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: ''
})
class MockNavbar {}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: ''
})
class MockHero {}

@Component({
  selector: 'app-popular-offers',
  standalone: true,
  template: ''
})
class MockOffers {}

@Component({
  selector: 'app-contact',
  standalone: true,
  template: ''
})
class MockContact {}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: ''
})
class MockFooter {}

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LandingComponent,
        MockNavbar,
        MockHero,
        MockOffers,
        MockContact,
        MockFooter
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit se créer', () => {
    expect(component).toBeTruthy();
  });
});

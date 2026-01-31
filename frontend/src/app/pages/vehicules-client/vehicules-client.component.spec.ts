// vehicules-client.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculesClientComponent } from './vehicules-client.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('VehiculesClientComponent', () => {
  let component: VehiculesClientComponent;
  let fixture: ComponentFixture<VehiculesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculesClientComponent], // Si c'est standalone
      // ou declarations: [VehiculesClientComponent] si non-standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Mock des params
            queryParams: of({}), // Mock des query params
            snapshot: { paramMap: new Map() } // Mock du snapshot
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
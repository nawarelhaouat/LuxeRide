import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch vehicles from backend', () => {
    const mockBackend = [
      {
        id: 1,
        marque: 'Toyota',
        modele: 'Corolla',
        immatriculation: 'AB-123-CD',
        prix_par_jour: 200,
        statut: 'disponible',
        image_url: null
      }
    ];

    service.getAll().subscribe(vehicles => {
      expect(vehicles.length).toBe(1);
      expect(vehicles[0].brand).toBe('Toyota');  // 🔥 mapping testé
      expect(vehicles[0].plate).toBe('AB-123-CD');
    });

    const req = httpMock.expectOne('http://localhost:8000/api/voiture');
    expect(req.request.method).toBe('GET');

    req.flush(mockBackend);
  });
});

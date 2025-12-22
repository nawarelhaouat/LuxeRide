import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService]
    });

    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET reservations API', () => {
    service.getAll().subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne('http://localhost:8000/api/admin/Reservation');
    expect(req.request.method).toBe('GET');

    req.flush({ 0: [] });
  });

  it('should call PATCH update status', () => {
    service.updateStatus(1, 'non valide').subscribe();

    const req = httpMock.expectOne(
      'http://localhost:8000/api/admin/Reservation/1'
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ statut: 'non valide' });

    req.flush({});
  });
});

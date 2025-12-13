import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';
describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API', () => {
    const mockResponse = { success: true };

    service.login('123456').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call sendRecoveryEmail API', () => {
    const mockResponse = { message: 'email sent' };

    service.sendRecoveryEmail('admin@example.com').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/recover-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.email).toBe('admin@example.com');

    req.flush(mockResponse);
  });
});

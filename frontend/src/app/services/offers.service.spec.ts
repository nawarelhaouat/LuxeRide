import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SelectedVehicleService } from './selected-vehicle.service';

describe('SelectedVehicleService', () => {
  let service: SelectedVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

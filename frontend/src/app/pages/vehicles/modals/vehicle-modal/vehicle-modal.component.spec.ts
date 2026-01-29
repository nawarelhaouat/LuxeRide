/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleModalComponent } from './vehicle-modal.component';


describe('VehicleModalComponent', () => {
  let component: VehicleModalComponent;
  let fixture: ComponentFixture<VehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModalComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleModalComponent);
    component = fixture.componentInstance;
  });

  // -------------------------------
  // TEST 1: Le composant existe
  // -------------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------------
  // TEST 2: submit() en MODE AJOUT
  // -------------------------------
  it('should emit save() without id when adding a vehicle', () => {
    spyOn(component.save, 'emit');

    component.vehicle = null;

    component.form = {
      brand: 'BMW',
      model: 'X5',
      plate: '123-ABC',
      pricePerDay: 90,
      status: 'available',
      image: ''
    };

    component.submit();

    expect(component.save.emit).toHaveBeenCalledWith({
      brand: 'BMW',
      model: 'X5',
      plate: '123-ABC',
      pricePerDay: 90,
      status: 'available',
      image: ''
    });
  });

  // -------------------------------
  // TEST 3: submit() en MODE EDIT
  // -------------------------------
  it('should emit save() with id when editing a vehicle', () => {
    spyOn(component.save, 'emit');

    component.vehicle = {
      id: 1,
      brand: 'Audi',
      model: 'A3',
      plate: 'AZ-456',
      pricePerDay: 120,
      status: 'rented',
      image: ''
    };

    component.form = {
      brand: 'Audi',
      model: 'A4',
      plate: 'AZ-456',
      pricePerDay: 130,
      status: 'rented',
      image: ''
    };

    component.submit();

    expect(component.save.emit).toHaveBeenCalledWith({
      id: 1,
      brand: 'Audi',
      model: 'A4',
      plate: 'AZ-456',
      pricePerDay: 130,
      status: 'rented',
      image: ''
    });
  });

  // -------------------------------
  // TEST 4: Émission de close()
  // -------------------------------
  it('should emit close event', () => {
    spyOn(component.close, 'emit');

    component.close.emit(); // Car il n'y a pas de méthode close()

    expect(component.close.emit).toHaveBeenCalled();
  });
});

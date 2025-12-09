import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleModalComponent } from './add-vehicle-modal.component';

describe('AddVehicleModalComponent', () => {
  let component: AddVehicleModalComponent;
  let fixture: ComponentFixture<AddVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

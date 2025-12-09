import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleModalComponent } from './delete-vehicle-modal.component';

describe('DeleteVehicleModalComponent', () => {
  let component: DeleteVehicleModalComponent;
  let fixture: ComponentFixture<DeleteVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVehicleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

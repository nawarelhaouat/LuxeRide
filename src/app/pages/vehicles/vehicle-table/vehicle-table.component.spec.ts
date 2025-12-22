import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTableComponent } from './vehicle-table.component';

describe('VehicleTableComponent', () => {
  let component: VehicleTableComponent;
  let fixture: ComponentFixture<VehicleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

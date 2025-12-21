import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesClientComponent } from './vehicules-client.component';

describe('VehiculesClientComponent', () => {
  let component: VehiculesClientComponent;
  let fixture: ComponentFixture<VehiculesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculesClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

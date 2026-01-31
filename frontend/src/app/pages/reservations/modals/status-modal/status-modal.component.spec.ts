import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusModalComponent } from './status-modal.component';
import { Reservation } from '../../../../models/reservation';

xdescribe('StatusModalComponent', () => {
  let component: StatusModalComponent;
  let fixture: ComponentFixture<StatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusModalComponent);
    component = fixture.componentInstance;

    // ✅ mock Input
    component.reservation = {
      reference: 'RES-1',
      clientName: 'Test Client',
      phone: '',
      cin: '',
      carBrand: '',
      carModel: '',
      plate: '',
      startDate: '',
      endDate: '',
      reservationDate: '',
      totalPrice: 0,
      paymentMethod: '',
      status: 'valide'
    } as Reservation;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

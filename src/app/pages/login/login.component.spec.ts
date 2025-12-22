import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login', 'sendRecoveryEmail']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------- MODAL ----------
  it('should open forgot modal', () => {
    component.openForgotModal();
    expect(component.showForgotModal).toBeTrue();
  });

  it('should close forgot modal', () => {
    component.closeForgotModal();
    expect(component.showForgotModal).toBeFalse();
  });

  // ---------- VALIDATION EMAIL ----------
  it('should validate email correctly', () => {
    expect(component.isValidEmail('test@gmail.com')).toBeTrue();
    expect(component.isValidEmail('invalid-email')).toBeFalse();
  });

  // ---------- LOGIN ----------
  it('should call login service on submit', () => {
    loginServiceSpy.login.and.returnValue(of({}));

    const formMock = { value: { code: '123456' } } as any;

    component.submit(formMock);

    expect(loginServiceSpy.login).toHaveBeenCalledWith('123456');
  });

  it('should set errorMessage on login failure', () => {
    loginServiceSpy.login.and.returnValue(throwError({ status: 401 }));

    const formMock = { value: { code: 'wrong' } } as any;

    component.submit(formMock);

    expect(component.errorMessage).toBe('Code administrateur invalide. Veuillez réessayer.');
  });

  // ---------- RECOVERY EMAIL ----------
  it('should not send email if invalid', () => {
    component.forgotEmail = "invalid";
    component.sendRecoveryEmail();
    expect(component.forgotError).toBeTruthy();
  });

  it('should call sendRecoveryEmail when email is valid', () => {
    component.forgotEmail = "admin@gmail.com";

    loginServiceSpy.sendRecoveryEmail.and.returnValue(of({}));

    component.sendRecoveryEmail();

    expect(loginServiceSpy.sendRecoveryEmail).toHaveBeenCalledWith('admin@gmail.com');
    expect(component.forgotSuccess).toBeTrue();
  });

  it('should show error if recovery email not found', () => {
    component.forgotEmail = "admin@gmail.com";

    loginServiceSpy.sendRecoveryEmail.and.returnValue(
      throwError({ status: 404 })
    );

    component.sendRecoveryEmail();

    expect(component.forgotError).toContain("Cet email n'est pas reconnu");
  });

});

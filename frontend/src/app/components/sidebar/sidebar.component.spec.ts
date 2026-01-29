import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterTestingModule,     // ✅ fournit ActivatedRoute + RouterLinkActive
        HttpClientTestingModule  // ✅ car NotificationService utilise HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and redirect to login with replaceUrl', () => {
    // ⚠️ seulement si tu as une méthode logout()
    // sinon adapte au nom de ta méthode
    component.logout();

    expect(router.navigate).toHaveBeenCalledWith(['/login'], { replaceUrl: true });
  });
});

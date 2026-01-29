import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable /*, of */ } from 'rxjs';

import { environment } from '../../environments/environment';
import { NotificationDto } from '../models/notification.model';

/* ============================
   MOCK (OPTIONNEL POUR TEST)
   ============================ */
// import { NOTIFICATIONS_MOCK } from '../mocks/notifications.mock';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  /* ============================
     BACKEND CONFIG
     ============================ */
  private readonly url = `${environment.apiUrl}/notifications`;

  /* ============================
     MOCK STORAGE (désactivé)
     ============================ */
  // private notificationsMock: NotificationDto[] = [...NOTIFICATIONS_MOCK];
  // private readonly useMock = false;

  constructor(private http: HttpClient) {}

  /* ============================
     GET NOTIFICATIONS
     ============================ */
  getNotifications(): Observable<NotificationDto[]> {

    /* ===== MOCK MODE ===== */
    // if (this.useMock) {
    //   return of(this.notificationsMock);
    // }

    /* ===== BACKEND MODE ===== */
    return this.http.get<NotificationDto[]>(this.url);
  }

  /* ============================
     MARK ONE AS READ
     ============================ */
  markAsRead(id: number): Observable<void> {

    /* ===== MOCK MODE ===== */
    // if (this.useMock) {
    //   const notif = this.notificationsMock.find(n => n.id === id);
    //   if (notif) notif.read = true;
    //   return of(void 0);
    // }

    /* ===== BACKEND MODE ===== */
    return this.http.patch<void>(`${this.url}/${id}/read`, {});
  }

  /* ============================
     MARK ALL AS READ
     ============================ */
  markAllAsRead(): Observable<void> {

    /* ===== MOCK MODE ===== */
    // if (this.useMock) {
    //   this.notificationsMock = this.notificationsMock.map(n => ({
    //     ...n,
    //     read: true
    //   }));
    //   return of(void 0);
    // }

    /* ===== BACKEND MODE ===== */
    return this.http.patch<void>(`${this.url}/read-all`, {});
  }
}

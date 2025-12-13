import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { NotificationService } from '../../services/notification.service';
import { NotificationDto } from '../../models/notification.model';

import { AuthService } from '../../services/auth.service'; // ✅ AJOUT

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  notifications: NotificationDto[] = [];

  constructor(
    private notifService: NotificationService,
    private authService: AuthService // ✅ AJOUT
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    this.notifService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: (err) => console.error('Erreur chargement notifications', err)
    });
  }

  // ✅ Afficher seulement les non lues
  get unreadNotifications(): NotificationDto[] {
    return this.notifications.filter(n => !n.read);
  }

  // ✅ Badge
  get unreadCount(): number {
    return this.unreadNotifications.length;
  }

  markAsRead(index: number, event: MouseEvent): void {
    event.stopPropagation();

    // ⚠️ index est basé sur unreadNotifications, donc on récupère d'abord la notif
    const notif = this.unreadNotifications[index];
    if (!notif) return;

    this.notifService.markAsRead(notif.id).subscribe({
      next: () => {
        // ✅ mettre à jour la liste locale (sans supprimer tout)
        const target = this.notifications.find(n => n.id === notif.id);
        if (target) target.read = true;
      },
      error: (err) => console.error('Erreur markAsRead', err)
    });
  }

  markAllAsRead(event: MouseEvent): void {
    event.stopPropagation();

    this.notifService.markAllAsRead().subscribe({
      next: () => {
        // ✅ mettre tout en read=true
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
      },
      error: (err) => console.error('Erreur markAllAsRead', err)
    });
  }

  // ✅ LOGOUT
  logout(): void {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

interface Notification {
  text: string;
  time: string;
  read: boolean;
}

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
export class SidebarComponent {

  notifications: Notification[] = [
    { text: 'Nouvelle réservation créée pour Audi A4', time: "À l'instant", read: false },
    { text: 'Nouvelle réservation créée pour Mercedes C-Class', time: "À l'instant", read: false },
    { text: 'Nouvelle réservation créée pour Mercedes C-Class', time: "À l'instant", read: false },
    { text: 'Nouvelle réservation créée pour Audi A4', time: "À l'instant", read: false },
    { text: 'Nouvelle réservation créée pour Mercedes', time: "À l'instant", read: false }
  ];

  /**
   * ✅ Marquer une notification comme lue (au clic)
   * La notification disparaît de la liste
   */
  markAsRead(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.notifications.splice(index, 1);
  }

  /**
   * ✅ Marquer toutes les notifications comme lues
   * Vide complètement la liste
   */
  markAllAsRead(event: MouseEvent): void {
    event.stopPropagation();
    this.notifications = [];
  }

  /**
   * ✅ Nombre de notifications non lues (pour le badge)
   */
  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
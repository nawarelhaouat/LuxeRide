import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css'],
  imports: [NgClass]
})
export class StatusBadgeComponent {
  @Input() status!: string;
}

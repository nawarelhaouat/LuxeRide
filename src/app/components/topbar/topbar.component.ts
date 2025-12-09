import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    console.log("TOPBAR → toggleSidebar() CLICKED");
    this.toggle.emit();
  }
}

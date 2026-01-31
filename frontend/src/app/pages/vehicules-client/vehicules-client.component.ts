import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicules-client',
  templateUrl: './vehicules-client.component.html',
  styleUrls: ['./vehicules-client.component.css']
})
export class VehiculesClientComponent implements OnInit {
  start = '';
  end = '';
  price = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.start = params['start'] || '';
      this.end = params['end'] || '';
      this.price = params['price'] || '';

      // Ici tu filtres ou tu appelles ton API
      // this.loadVehicules(this.start, this.end, this.price);
    });
  }
}

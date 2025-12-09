import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // ─────────────── CARDS STATISTIQUES ───────────────
  stats = [
    { label: 'Réservations', value: 284, icon: '🚗', variation: '+12.5%' },
    { label: 'Revenus', value: '€28,450', icon: '📈', variation: '+8.2%' },
    { label: 'Taux d’Utilisation', value: '87%', icon: '📊', variation: '+5.1%' },
    { label: 'Maintenance', value: '12 véhicules', icon: '⚠️', variation: '-2.3%' }
  ];

  // ─────────────── LINE CHART ───────────────
  reservationsData: ChartData<'line'> = {
    labels: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
    datasets: [{
      data: [45, 55, 50, 62, 54, 70, 60],
      borderColor: '#0b3b2e',
      backgroundColor: 'rgba(11, 59, 46, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#0b3b2e'
    }]
  };

  reservationsOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  // ─────────────── PIE CHART ───────────────
  usageData: ChartData<'pie'> = {
    labels: ['Disponible (35%)', 'Loué (50%)', 'Maintenance (15%)'],
    datasets: [{
      data: [35, 50, 15],
      backgroundColor: ['#a89b6f', '#0b3b2e', '#e6dfd3']
    }]
  };

  usageOptions: ChartOptions = {
    responsive: true,
  };

  // ─────────────── BAR CHART ───────────────
  revenuesData: ChartData<'bar'> = {
    labels: ['Janv','Févr','Mars','Avr','Mai','Juin'],
    datasets: [{
      data: [11000, 14500, 13000, 15500, 17000, 20000],
      backgroundColor: '#0b3b2e'
    }]
  };

  revenuesOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } }
  };
}

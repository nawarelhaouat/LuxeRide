import { AfterViewInit, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import {
  Chart,
  LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend,
  DoughnutController, ArcElement,
  BarController, BarElement
} from 'chart.js';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend,
  DoughnutController, ArcElement,
  BarController, BarElement
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.createReservationsLineChart();
    this.createUtilisationPieChart();
    this.createRevenusBarChart();
  }

  private createReservationsLineChart(): void {
    // ... (inchangé, ton code line chart reste le même)
    const canvas = document.getElementById('reservationsChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Réservations',
          data: [45, 52, 48, 61, 54, 69, 58],
          tension: 0.35,
          pointRadius: 4,
          backgroundColor: '#50441920',
          borderColor: '#195042',
          pointBackgroundColor: '#195042',
          fill: true,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { 
            grid: { display: false },
            border: { color: '#a3854ae0', width: 2 },
            ticks: { color: '#a3854ae0', font: { size: 13 } }
          },
          y: { 
            beginAtZero: true,
            max: 80,
            ticks: { stepSize: 20, color: '#a3854ae0', font: { size: 13 } },
            border: { color: '#a3854ae0', width: 2 },
            grid: { color: '#f3f4f6' }
          }
        }
      }
    });
  }

 private createUtilisationPieChart(): void {
  const canvas = document.getElementById('utilisationChart') as HTMLCanvasElement | null;
  if (!canvas) return;

  const data = [50, 35, 15];
  const labels = ['Loué', 'Disponible', 'Maintenance'];
  const colors = ['#195042', '#A3864A', '#d4d4d4'];

  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff',
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { size: 13, family: 'Roboto', weight: 500 },
            boxWidth: 12,
            boxHeight: 12,
          },
          onClick: () => {} // Désactive le clic sur la légende
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#ffffff',
          titleColor: '#195042',
          bodyColor: '#195042',
          borderColor: '#A3864A',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: (context) => `${context.label}: ${context.parsed}%`
          },
          titleFont: {
            size: 14,
            weight: 'bold',
            family: 'Roboto'
          },
          bodyFont: {
            size: 13,
            family: 'Roboto'
          }
        }
      },
      onHover: (event: any, activeElements: any) => {
        const target = event.native?.target;
        if (target) {
          target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        }
      }
    }
  });
}

  private createRevenusBarChart(): void {
    // ... (inchangé, ton code bar chart reste le même)
    const canvas = document.getElementById('revenusChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [{
          label: 'Revenus',
          data: [12000, 14500, 13000, 15500, 18000, 21000],
          backgroundColor: '#195042',
          hoverBackgroundColor: '#e4dac58b',
          borderRadius: 8,
          barPercentage: 0.55,
          categoryPercentage: 0.8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#195042',
            bodyColor: '#195042',
            borderColor: '#A3864A',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => `revenue : ${item.raw}`
            },
             titleFont: {
            size: 14,
            weight: 'bold',
            family: 'Roboto'
          },
          bodyFont: {
            size: 13,
            family: 'Roboto'
          }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#a3854ae0', font: { size: 13 } },
            border: { color: '#a3854ae0', width: 2 }
          },
          y: {
            beginAtZero: true,
            max: 22000,
            ticks: { stepSize: 5500, color: '#a3854ae0', font: { size: 13 } },
            grid: { color: '#f3f4f6' },
            border: { color: '#a3854ae0', width: 2 }
          }
        }
      }
    });
  }
}
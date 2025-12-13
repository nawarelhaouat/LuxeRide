import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DashboardService } from '../../services/dashboard.service';
import { DashboardResponse, DashboardStats } from '../../models/dashboard.model';

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
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  stats!: DashboardStats;

  private reservationsChart?: Chart;
  private utilisationChart?: Chart;
  private revenusChart?: Chart;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data: DashboardResponse) => {
        this.stats = data.stats;

        // ✅ attendre que le *ngIf affiche les canvas
        setTimeout(() => {
          this.createReservationsLineChart(
            data.reservationsLine.labels,
            data.reservationsLine.values
          );

          this.createUtilisationPieChart(
            data.utilisationDoughnut.labels,
            data.utilisationDoughnut.values
          );

          this.createRevenusBarChart(
            data.revenusBar.labels,
            data.revenusBar.values
          );
        });
      },
      error: (err) => console.error('Erreur chargement dashboard', err)
    });
  }

  /* ================= TREND HELPERS ================= */

  getTrendClass(trend: number): string {
    if (trend > 0) return 'positive';
    if (trend < 0) return 'negative';
    return 'stable';
  }

  getTrendIcon(trend: number): string {
    if (trend > 0) return 'trending_up';
    if (trend < 0) return 'trending_down';
    return 'trending_flat';
  }

  formatTrend(trend: number): string {
    if (trend > 0) return `+${trend}%`;
    if (trend < 0) return `${trend}%`;
    return '0%';
  }

  /* ================= CHARTS (STYLE INITIAL CONSERVÉ) ================= */

  private createReservationsLineChart(labels: string[], values: number[]): void {
    const canvas = document.getElementById('reservationsChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    this.reservationsChart?.destroy();

    this.reservationsChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Réservations',
          data: values,
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

  private createUtilisationPieChart(labels: string[], values: number[]): void {
    const canvas = document.getElementById('utilisationChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    this.utilisationChart?.destroy();

    const colors = ['#195042', '#A3864A', '#d4d4d4'];

    this.utilisationChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
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
              font: { size: 13, family: 'Roboto', weight: 500 as any },
              boxWidth: 12,
              boxHeight: 12,
            },
            onClick: () => {}
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

  private createRevenusBarChart(labels: string[], values: number[]): void {
    const canvas = document.getElementById('revenusChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    this.revenusChart?.destroy();

    this.revenusChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenus',
          data: values,
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

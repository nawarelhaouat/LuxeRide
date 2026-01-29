import { DashboardResponse } from '../models/dashboard.model';

export const DASHBOARD_MOCK: DashboardResponse = {
  stats: {
    reservations: {
      value: 284,
      trend: 12.5
    },
    revenus: {
      value: 28450,
      trend: 8.2
    },
    tauxUtilisation: {
      value: 87,
      trend: 5.1
    },
    maintenance: {
      value: 12,
      trend: -2.3
    }
  },

  reservationsLine: {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    values: [45, 52, 48, 61, 54, 69, 58]
  },

  utilisationDoughnut: {
    labels: ['Loué', 'Disponible', 'Maintenance'],
    values: [50, 35, 15]
  },

  revenusBar: {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    values: [12000, 14500, 13000, 15500, 18000, 21000]
  }
};

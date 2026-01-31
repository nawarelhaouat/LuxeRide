export interface StatWithTrend {
  value: number;
  trend: number; 
}

export interface DashboardStats {
  reservations: StatWithTrend;
  revenus: StatWithTrend;
  tauxUtilisation: StatWithTrend;
  maintenance: StatWithTrend;
}

export interface LineChartData {
  labels: string[];
  values: number[];
}

export interface DoughnutChartData {
  labels: string[];
  values: number[];
}

export interface BarChartData {
  labels: string[];
  values: number[];
}

export interface DashboardResponse {
  stats: DashboardStats;
  reservationsLine: LineChartData;
  utilisationDoughnut: DoughnutChartData;
  revenusBar: BarChartData;
}

<?php

namespace App\Http\Controllers;

use App\Services\VoitureService;
use App\Services\LocationService;

class DashboardController extends Controller
{
    protected $voitureService;
    protected $locationService;

    public function __construct(
        VoitureService $voitureService,
        LocationService $locationService
    ) {
        $this->voitureService = $voitureService;
        $this->locationService = $locationService;
    }

    public function index()
    {
        $reservations = $this->locationService->totalReservationsEvolution();
        $revenus = $this->locationService->cumulativeRevenueEvolution();
        $utilisation = $this->voitureService->utilizationRateEvolution();
        $maintenance = $this->voitureService->vehiclesInMaintenanceEvolution();

        $weekly = $this->locationService->weeklyReservations();
        $monthlyRevenue = $this->locationService->monthlyRevenueLast6Months();

        return response()->json([
            'stats' => [
                'reservations' => [
                    'value' => $reservations['current'],
                    'trend' => round($reservations['evolution'], 2)
                ],
                'revenus' => [
                    'value' => $revenus['current'],
                    'trend' => round($revenus['evolution'], 2)
                ],
                'tauxUtilisation' => [
                    'value' => round($utilisation['current']),
                    'trend' => round($utilisation['evolution'], 2)
                ],
                'maintenance' => [
                    'value' => $maintenance['current'],
                    'trend' => round($maintenance['evolution'], 2)
                ]
            ],

            'reservationsLine' => $weekly,

            'utilisationDoughnut' => [
                'labels' => ['Loué', 'Disponible', 'Maintenance'],
                'values' => [
                    $this->voitureService->vehiclesInUse(),
                    $this->voitureService->vehiclesAvailable(),
                    $this->voitureService->vehiclesInMaintenance()
                ]
            ],

            'revenusBar' => $monthlyRevenue
        ]);
    }
}

<?php

namespace App\Services;

use App\Models\Location;
use App\Models\Voiture;
use Carbon\Carbon;

class BusinessAnalysisService
{
    public function generateStats(): array
    {
        $totalReservations = Location::count();

        $totalRevenue = Location::where('valide', true)
            ->sum('montant_total');

        $cancelRate = Location::where('valide', false)->count();
        $cancelRate = $totalReservations > 0
            ? round(($cancelRate / $totalReservations) * 100, 2)
            : 0;

        $totalCars = Voiture::count();

        $occupiedCars = Location::where('valide', true)
            ->distinct('id_voiture')
            ->count('id_voiture');

        $occupationRate = $totalCars > 0
            ? round(($occupiedCars / $totalCars) * 100, 2)
            : 0;

        $topVehicle = Location::selectRaw('id_voiture, COUNT(*) as total')
            ->groupBy('id_voiture')
            ->orderByDesc('total')
            ->first();

        $topVehicleName = null;
        if ($topVehicle) {
            $car = Voiture::find($topVehicle->id_voiture);
            $topVehicleName = $car
                ? $car->marque . ' ' . $car->modele
                : null;
        }

        return [
            'total_reservations' => $totalReservations,
            'total_revenue' => $totalRevenue,
            'occupation_rate' => $occupationRate,
            'cancel_rate' => $cancelRate,
            'top_vehicle' => $topVehicleName,
        ];
    }
}

<?php

namespace App\Services;

use App\Models\Voiture;

class VoitureService
{
    public function totalVehicles()
    {
        return Voiture::count();
    }

    public function vehiclesInMaintenance()
    {
        return Voiture::where('statut', 'en_maintenance')->count();
    }

    public function vehiclesInMaintenanceEvolution()
    {
        $current = Voiture::where('statut', 'en_maintenance')->count();

        $previous = Voiture::where('statut', 'en_maintenance')
            ->whereMonth('date_ajout', now()->subMonth()->month)
            ->count();

        $evolution = $previous > 0
            ? (($current - $previous) / $previous) * 100
            : 0;

        return [
            'current' => $current,
            'evolution' => $evolution
        ];
    }

    public function vehiclesInUse()
    {
        return Voiture::where('statut', 'loue')->count();
    }

    public function vehiclesAvailable()
    {
        return Voiture::where('statut', 'disponible')->count();
    }

    public function utilizationRateEvolution()
    {
        $total = Voiture::count();

        $currentInUse = Voiture::where('statut', 'loue')->count();
        $currentRate = $total > 0 ? ($currentInUse / $total) * 100 : 0;

        $prevInUse = Voiture::where('statut', 'loue')
            ->whereMonth('date_ajout', now()->subMonth()->month)
            ->count();

        $prevRate = $total > 0 ? ($prevInUse / $total) * 100 : 0;

        $evolution = $prevRate > 0
            ? (($currentRate - $prevRate) / $prevRate) * 100
            : 0;

        return [
            'current' => $currentRate,
            'evolution' => $evolution
        ];
    }
}

<?php

namespace App\Services;

use App\Models\Location;
use Carbon\Carbon;

class LocationService
{
    public function totalReservationsEvolution()
    {
        $current = Location::whereMonth('date_reservation', now()->month)
            ->where('valide', true)
            ->count();

        $previous = Location::whereMonth('date_reservation', now()->subMonth()->month)
            ->where('valide', true)
            ->count();

        $evolution = $previous > 0
            ? (($current - $previous) / $previous) * 100
            : 0;

        return [
            'current' => $current,
            'evolution' => $evolution
        ];
    }

    public function cumulativeRevenueEvolution()
    {
        $current = Location::whereMonth('date_reservation', now()->month)
            ->where('valide', true)
            ->sum('montant_total');

        $previous = Location::whereMonth('date_reservation', now()->subMonth()->month)
            ->where('valide', true)
            ->sum('montant_total');

        $evolution = $previous > 0
            ? (($current - $previous) / $previous) * 100
            : 0;

        return [
            'current' => $current,
            'evolution' => $evolution
        ];
    }

    public function weeklyReservations()
    {
        $labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        $values = [];

        foreach (range(0, 6) as $i) {
            $date = Carbon::now()->startOfWeek()->addDays($i);

            $values[] = Location::whereDate('date_reservation', $date)
                ->where('valide', true)
                ->count();
        }

        return [
            'labels' => $labels,
            'values' => $values
        ];
    }

    public function monthlyRevenueLast6Months()
    {
        $labels = [];
        $values = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);

            $labels[] = $month->translatedFormat('F');
            $values[] = Location::whereMonth('date_reservation', $month->month)
                ->whereYear('date_reservation', $month->year)
                ->where('valide', true)
                ->sum('montant_total');
        }

        return [
            'labels' => $labels,
            'values' => $values
        ];
    }
}

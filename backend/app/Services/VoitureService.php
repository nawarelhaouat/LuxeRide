<?php

namespace App\Services;

use App\Models\Voiture;

class VoitureService
{
    protected $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Retourne le nombre total de véhicules
     */
    public function totalVehicles(): int
    {
        return Voiture::count();
    }

    /**
     * Retourne tous les véhicules, ou filtrés par statut
     */
    public function getAll(?string $statut = null)
    {
        return $statut
            ? Voiture::where('statut', $statut)->get()
            : Voiture::all();
    }

    public function getById(int $id): ?Voiture
    {
        return Voiture::find($id);
    }

    /**
     * Compte le nombre de véhicules par statut
     */
    public function countByStatus(?string $statut = null): int
    {
        return $statut ? Voiture::where('statut', $statut)->count() : $this->totalVehicles();
    }

    /**
     * Retourne le nombre de véhicules en maintenance
     */
    public function vehiclesInMaintenance(): int
    {
        return $this->countByStatus('en_maintenance');
    }

    /**
     * Retourne l'évolution des véhicules en maintenance par rapport au mois précédent
     */
    public function vehiclesInMaintenanceEvolution(): array
    {
        $current = $this->vehiclesInMaintenance();
        $previous = Voiture::where('statut', 'en_maintenance')
            ->whereMonth('date_ajout', now()->subMonth()->month)
            ->count();

        return [
            'current' => $current,
            'evolution' => $this->calculateEvolution($current, $previous)
        ];
    }

    public function update(int $id, array $data): ?Voiture
    {
        $voiture = Voiture::find($id);

        if (!$voiture) {
            return null;
        }

        $voiture->fill($data);

        $voiture->save();

        return $voiture;
    }

    public function create(array $data): Voiture
    {
        return Voiture::create($data);
    }

    /**
     * Supprime une voiture par son id
     *
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id): ?bool
    {
        $voiture = Voiture::find($id);

        if (!$voiture) {
            return null;
        }

        return $voiture->delete();
    }

    /**
     * Retourne le nombre de véhicules en utilisation (loués)
     */
    public function vehiclesInUse(): int
    {
        return $this->countByStatus('loue');
    }

    /**
     * Retourne le nombre de véhicules disponibles
     */
    public function vehiclesAvailable(): int
    {
        return $this->countByStatus('disponible');
    }

    /**
     * Retourne le taux d'utilisation actuel et son évolution par rapport au mois précédent
     */
    public function utilizationRateEvolution(): array
    {
        $total = $this->totalVehicles();
        $currentInUse = $this->vehiclesInUse();
        $currentRate = $total > 0 ? ($currentInUse / $total) * 100 : 0;

        $prevInUse = Voiture::where('statut', 'loue')
            ->whereMonth('date_ajout', now()->subMonth()->month)
            ->count();
        $prevRate = $total > 0 ? ($prevInUse / $total) * 100 : 0;

        return [
            'current' => $currentRate,
            'evolution' => $this->calculateEvolution($currentRate, $prevRate)
        ];
    }

    /**
     * Retourne les 5 véhicules les plus loués
     */
    public function getVehicles(array $filters = [])
    {
        $query = Voiture::query()
            ->select('id_voiture', 'marque', 'modele', 'prix_par_jour', 'image', 'statut');

        if (!empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }
        if (!empty($filters['marque'])) {
            $query->where('marque', $filters['marque']);
        }
        if (!empty($filters['modele'])) {
            $query->where('modele', $filters['modele']);
        }
        if (!empty($filters['prix_min'])) {
            $query->where('prix_par_jour', '>=', $filters['prix_min']);
        }
        if (!empty($filters['prix_max'])) {
            $query->where('prix_par_jour', '<=', $filters['prix_max']);
        }
        if (!empty($filters['date_debut']) && !empty($filters['date_fin'])) {
            $query->where('statut', 'disponible')
            ->whereNotIn('id_voiture', function ($subQuery) use ($filters) {
                $subQuery->select('id_voiture')
                    ->from('location')
                    ->where(function ($q) use ($filters) {
                        $q->whereBetween('date_debut', [$filters['date_debut'], $filters['date_fin']])
                            ->orWhereBetween('date_fin', [$filters['date_debut'], $filters['date_fin']]);
                    });
            });
        }

        return $query->get();
    }

    public function getMostRentedCars()
    {
        $carIds = $this->locationService->mostRentedCarIds();

        if ($carIds instanceof \Illuminate\Support\Collection) {
            $carIds = $carIds->toArray();
        }

        if (empty($carIds)) {
            return collect();
        }

        return Voiture::whereIn('id_voiture', $carIds)
            ->select('id_voiture', 'marque', 'prix_par_jour', 'image')
            ->orderByRaw("FIELD(id_voiture," . implode(',', $carIds) . ")")
            ->get();
    }



    /**
     * Helper pour calculer l'évolution en pourcentage
     */
    private function calculateEvolution(float|int $current, float|int $previous): float
    {
        return $previous > 0 ? (($current - $previous) / $previous) * 100 : 0;
    }
}

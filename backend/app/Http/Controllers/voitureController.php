<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VoitureService;


class VoitureController extends Controller
{
    protected $voitureService;

    public function __construct(VoitureService $voitureService)
    {
        $this->voitureService = $voitureService;
    }

    // -----------------------------
    // Admin Routes
    // -----------------------------

    /**
     * GET /api/admin/voiture
     * Liste de toutes les voitures, avec filtrage optionnel par statut
     */
    public function index(Request $request)
    {
        $statut = $request->query('statut');
        $voitures = $this->voitureService->getAll($statut);
        return response()->json($voitures);
    }

    /**
     * GET /api/admin/voiture/{id}
     * Détails d'une voiture
     */
    public function show($id)
    {
        $voiture = $this->voitureService->getById($id);

        if (!$voiture) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        return response()->json($voiture);
    }

    /**
     * POST /api/admin/voiture
     * Création d'une voiture
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'plate_number' => 'required|string|max:50|unique:voiture,immatriculation',
            'price_per_day' => 'required|numeric',
            'image_url' => 'nullable|string|max:255',
            'status' => 'required|in:disponible,loue,en_maintenance',
            'id_admin' => 'required|exists:admin,id_admin',
        ]);

        $data = [
            'marque' => $validated['brand'],
            'modele' => $validated['model'],
            'immatriculation' => $validated['plate_number'],
            'prix_par_jour' => $validated['price_per_day'],
            'image' => $validated['image_url'] ?? null,
            'statut' => $validated['status'],
            'id_admin' => $validated['id_admin'],
            'date_ajout' => now(),
        ];

        $voiture = $this->voitureService->create($data);
        return response()->json($voiture, 201);
    }

    /**
     * PUT /api/admin/voiture/{id}
     * Mise à jour d'une voiture
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'brand' => 'sometimes|string|max:50',
            'model' => 'sometimes|string|max:50',
            'plate_number' => 'sometimes|string|max:50|unique:voiture,immatriculation,'.$id.',id_voiture',
            'price_per_day' => 'sometimes|numeric',
            'image_url' => 'nullable|string|max:255',
            'status' => 'sometimes|in:disponible,loue,en_maintenance',
            'id_admin' => 'sometimes|exists:admin,id_admin',
        ]);

        $data = [];
        if(isset($validated['brand'])) $data['marque'] = $validated['brand'];
        if(isset($validated['model'])) $data['modele'] = $validated['model'];
        if(isset($validated['plate_number'])) $data['immatriculation'] = $validated['plate_number'];
        if(isset($validated['price_per_day'])) $data['prix_par_jour'] = $validated['price_per_day'];
        if(array_key_exists('image_url', $validated)) $data['image'] = $validated['image_url'];
        if(isset($validated['status'])) $data['statut'] = $validated['status'];
        if(isset($validated['id_admin'])) $data['id_admin'] = $validated['id_admin'];

        $voiture = $this->voitureService->update($id, $data);
        return response()->json($voiture);
    }

    /**
     * DELETE /api/admin/voiture/{id}
     * Suppression d'une voiture
     */
    public function destroy($id)
    {
        $this->voitureService->delete($id);
        return response()->json(['message' => 'Voiture supprimée avec succès']);
    }

    // -----------------------------
    // Client Routes
    // -----------------------------

    /**
     * GET /api/client/voitures
     * Récupère tous les véhicules (optionnellement filtrés par statut)
     */
    public function getAllVehicles(Request $request)
    {
        $statut = $request->query('statut');
        $voitures = $this->voitureService->getAll($statut);
        return response()->json($voitures);
    }

    /**
     * GET /api/client/voitures/search
     * Recherche avancée de véhicules avec filtres dynamiques
     */
    public function searchVehicles(Request $request)
    {
        $filters = $request->only([
            'marque',
            'modele',
            'prix_min',
            'prix_max',
            'date_debut',
            'date_fin',
            'statut',
        ]);

        $voitures = $this->voitureService->getVehicles($filters);
        return response()->json($voitures);
    }

    /**
     * GET /api/client/voitures/most-rented
     * Récupère les 5 véhicules les plus loués
     */
    public function MostRentedCars()
    {
        $voitures = $this->voitureService->getMostRentedCars();
        return response()->json($voitures);
    }
}

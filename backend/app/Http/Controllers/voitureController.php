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

    public function index(Request $request)
    {
        $statut = $request->query('statut');
        $voitures = $this->voitureService->getAll($statut);
        return response()->json($voitures);
    }

    public function show($id)
    {
        $voiture = $this->voitureService->getById($id);
        return response()->json($voiture);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'plate_number' => 'required|string|max:50|unique:voiture,immatriculation',
            'price_per_day' => 'required|numeric',
            'image_url' => 'nullable|string|max:50',
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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'brand' => 'sometimes|string|max:50',
            'model' => 'sometimes|string|max:50',
            'plate_number' => 'sometimes|string|max:50|unique:voiture,immatriculation,'.$id.',id_voiture',
            'price_per_day' => 'sometimes|numeric',
            'image_url' => 'nullable|string|max:50',
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

    public function destroy($id)
    {
        $this->voitureService->delete($id);
        return response()->json(['message' => 'Voiture supprimée']);
    }
}

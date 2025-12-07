<?php

namespace App\Http\Controllers;

use App\Models\voiture;
use Illuminate\Http\Request;

class VoitureController extends Controller
{
    // Lister les voitures avec filtrage
    public function index(Request $request)
    {
        $statut = $request->query('statut');
        $query = voiture::query();

        if ($statut && in_array($statut, ['disponible', 'loue', 'en_maintenance'])) {
            $query->where('statut', $statut);
        }

        $voitures = $query->get();


        $mapped = $voitures->map(function ($v) {
            return [
                'id' => $v->id_voiture,
                'brand' => $v->marque,
                'model' => $v->modele,
                'plate_number' => $v->immatriculation,
                'price_per_day' => $v->prix_par_jour,
                'status' => $v->statut,
                'image_url' => $v->image,
            ];
        });

        return response()->json($mapped);
    }

    // Afficher une voiture
    public function show($id)
    {
        $voiture = voiture::findOrFail($id);

        $mapped = [
            'id' => $voiture->id_voiture,
            'brand' => $voiture->marque,
            'model' => $voiture->modele,
            'plate_number' => $voiture->immatriculation,
            'price_per_day' => $voiture->prix_par_jour,
            'status' => $voiture->statut,
            'image_url' => $voiture->image
        ];

        return response()->json($mapped);
    }

    // Ajouter une voiture
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

        $voiture = voiture::create($data);

        $response = [
            'id' => $voiture->id_voiture,
            'brand' => $voiture->marque,
            'model' => $voiture->modele,
            'plate_number' => $voiture->immatriculation,
            'price_per_day' => $voiture->prix_par_jour,
            'status' => $voiture->statut,
            'image_url' => $voiture->image,
        ];

        return response()->json($response, 201);
    }

    // Modifier une voiture
    public function update(Request $request, $id)
    {
        $voiture = voiture::findOrFail($id);

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

        $voiture->update($data);

        $response = [
            'id' => $voiture->id_voiture,
            'brand' => $voiture->marque,
            'model' => $voiture->modele,
            'plate_number' => $voiture->immatriculation,
            'price_per_day' => $voiture->prix_par_jour,
            'status' => $voiture->statut,
            'image_url' => $voiture->image,
        ];

        return response()->json($response);
    }

    // Supprimer une voiture
    public function destroy($id)
    {
        $voiture = voiture::findOrFail($id);
        $voiture->delete();
        return response()->json(['message' => 'Voiture supprimée']);
    }
}

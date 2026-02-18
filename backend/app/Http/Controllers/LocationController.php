<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Voiture;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function store(Request $request)
    {
        // ✅ 1. Validation
        $data = $request->validate([
            'nom_client' => 'required|string',
            'prenom_client' => 'required|string',
            'telephone_client' => 'required|string',
            'email_client' => 'required|email',
            'cin_client' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'id_voiture' => 'required|exists:voiture,id_voiture',
            'montant_total' => 'required|numeric|min:0',
        ]);

        // ✅ 2. Création réservation
        $location = Location::create([
            'date_reservation' => now(),
            'date_debut' => $data['date_debut'],
            'date_fin' => $data['date_fin'],
            'montant_total' => $data['montant_total'],
            'nom_client' => $data['nom_client'],
            'prenom_client' => $data['prenom_client'],
            'telephone_client' => $data['telephone_client'],
            'email_client' => $data['email_client'],
            'cin_client' => $data['cin_client'],
            'valide' => false,
            'id_voiture' => $data['id_voiture'],
        ]);

        return response()->json([
            'message' => 'Réservation créée avec succès',
            'location' => $location
        ], 201);
    }

    public function index()
    {
        return Location::with('voiture')->get();
    }

    public function show($id)
    {
        return Location::with('voiture')->findOrFail($id);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\location;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function index(Request $request)
{
    $dateDebut = $request->query('date_debut');
    $dateFin   = $request->query('date_fin');

    
    if (($dateDebut && !$dateFin) || (!$dateDebut && $dateFin)) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Les deux dates (date_debut et date_fin) sont obligatoires',
            'data'    => []
        ], 400);
    }

    $query = Location::query()
        ->join('voiture as v', 'v.id_voiture', '=', 'location.id_voiture')
        ->select(
            'location.id_location',
            'location.valide',
            'location.nom_client',
            'location.prenom_client',
            'v.marque',
            'v.modele',
            'v.immatriculation'
        );

    if ($dateDebut && $dateFin) {
        $query->whereDate('location.date_debut', '>=', $dateDebut)
              ->whereDate('location.date_fin', '<=', $dateFin);
    }

    $locations = $query->get();

    $mapped = $locations->map(function ($v) {
        return [
            'id_location'        => $v->id_location,
            
            'nom_client'         => $v->nom_client,
            'prenom_client'         => $v->nom_client,

            'marque'             => $v->marque,
            'modele'             => $v->modele,
            'immatriculation'    => $v->immatriculation,

            'valide'             => $v->valide ? 'valide' : 'non valide',
        ];
    });

    
    return response()->json([
        'message' => $mapped->isEmpty()
            ? 'Aucune location trouvée'
            : 'Liste des locations récupérée avec succès',
        $mapped
    ], 200);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
  public function show(string $id)
{
    $location = Location::query()
        ->join('voiture as v', 'v.id_voiture', '=', 'location.id_voiture')
        ->select(
            'location.*',
            'v.marque',
            'v.modele',
            'v.immatriculation'
        )
        ->where('location.id_location', $id)
        ->first();

    if (!$location) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Location introuvable'
        ], 404);
    }

    return response()->json([
        [
            'id_location'        => $location->id_location,
            'date_reservation'   => $location->date_reservation,
            'date_debut'         => $location->date_debut,
            'date_fin'           => $location->date_fin,
            'montant_total'      => $location->montant_total,

            'nom_client'         => $location->nom_client,
            'prenom_client'      => $location->prenom_client,
            'telephone_client'   => $location->telephone_client,
            'email_client'       => $location->email_client,
            'cin_client'         => $location->cin_client,

            'marque'             => $location->marque,
            'modele'             => $location->modele,
            'immatriculation'    => $location->immatriculation,

            'statut'             => $location->valide ? 'valide' : 'non valide',
        ]
    ], 200);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $validator = Validator::make($request->all(), [
        'statut' => 'required|string|in:valide,non valide',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Le champ statut doit être "valide" ou "non valide"',
            'errors'  => $validator->errors()
        ], 422);
    }

    $reservation = Location::where('id_location', $id)->first();

    if (!$reservation) {
        return response()->json([
            'status'  => 'error',
            'message' => 'Réservation introuvable'
        ], 404);
    }

    $reservation->valide = $request->statut === 'valide'; //conversion de string en bool
    $reservation->save();

    return response()->json([
        'status'  => 'success',
        'message' => 'Statut de la réservation mis à jour avec succès',
        'statut'  => $reservation->valide ? 'valide' : 'non valide'
    ], 200);
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

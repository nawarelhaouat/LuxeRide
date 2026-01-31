<?php

namespace App\Models;

use Database\Factories\VoitureFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Location extends Model
{
    use HasFactory;

    // Nom de la table

    use HasFactory;

    protected $table = 'location';

    // Clé primaire personnalisée
    protected $primaryKey = 'id_location';

    // Auto-incrément activé
    public $incrementing = true;

    protected $keyType = 'int';

    // Pas de timestamps
    public $timestamps = false;

    // Casts
    protected $casts = [
        'valide' => 'boolean',
    ];

    // Champs modifiables en masse
    protected $fillable = [
        'id_location',
        'date_reservation',
        'date_debut',
        'date_fin',
        'montant_total',
        'nom_client',
        'prenom_client',
        'telephone_client',
        'email_client',
        'cin_client',
        'valide',
        'id_voiture',
        'id_admin',
    ];

    /**
     * Relations
     */

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}

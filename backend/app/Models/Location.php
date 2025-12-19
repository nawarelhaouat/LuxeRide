<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Location extends Model
{
    use HasFactory;
    // Nom de la table
    protected $table = 'location';

    // La clé primaire n'est pas "id" mais "id_location"
    protected $primaryKey = 'id_location';

    // Pas d'auto-incrément car ta migration ne l'utilise pas
    public $incrementing = false;

    // Type de la clé primaire
    protected $keyType = 'integer';

    // Pas de timestamps dans ta table
    public $timestamps = false;

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

    // Une location appartient à une voiture
    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }

    // Une location appartient à un admin
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}

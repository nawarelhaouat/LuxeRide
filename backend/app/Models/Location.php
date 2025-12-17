<?php

namespace App\Models;

use Database\Factories\VoitureFactory;
use Illuminate\Database\Eloquent\Model;

class location extends Model {
    protected $table = 'location';
    protected $primaryKey = 'id_location';
    public $incrementing = true;
    protected $keyType = 'int';
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
        'valide'
    ];

    public function voiture() {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }
    public function admin() {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }

}

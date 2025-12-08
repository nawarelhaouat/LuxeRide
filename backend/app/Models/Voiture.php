<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;

class voiture extends Model
{
    use HasFactory;

    protected $table = 'voiture';
    protected $primaryKey = 'id_voiture';
    public $timestamps = false;

    protected $fillable = [
        'marque',
        'modele',
        'immatriculation',
        'prix_par_jour',
        'image',
        'statut',
        'date_ajout',
        'id_admin',
    ];

    public function admin() {
        return $this->belongsTo(Admin::class, 'id_admin', 'id_admin');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; #creation de fake data pour test
use Illuminate\Foundation\Auth\User as Authenticatable; #mondal en compte user
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'admin'; 
    protected $primaryKey = 'id_admin';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'code'
    ];

    protected $hidden = [
        'code'
    ];
}

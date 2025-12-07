<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VoitureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $voitures = [
            [
                'id_voiture' => 1,
                'marque' => 'Renault',
                'modele' => 'Clio',
                'immatriculation' => '12345-67-AB',
                'prix_par_jour' => 350.00,
                'image' => null,
                'statut' => 'disponible',
                'date_ajout' => now(),
                'id_admin' => 'ADM001',
            ],
            [
                'id_voiture' => 2,
                'marque' => 'Peugeot',
                'modele' => '208',
                'immatriculation' => '54321-67-CD',
                'prix_par_jour' => 400.00,
                'image' => null,
                'statut' => 'loue',
                'date_ajout' => now(),
                'id_admin' => 'ADM001',
            ],
            [
                'id_voiture' => 3,
                'marque' => 'Dacia',
                'modele' => 'Sandero',
                'immatriculation' => '67890-12-EF',
                'prix_par_jour' => 300.00,
                'image' => null,
                'statut' => 'en_maintenance',
                'date_ajout' => now(),
                'id_admin' => 'ADM001',
            ],
            [
                'id_voiture' => 4,
                'marque' => 'Toyota',
                'modele' => 'Corolla',
                'immatriculation' => '98765-43-GH',
                'prix_par_jour' => 500.00,
                'image' => null,
                'statut' => 'disponible',
                'date_ajout' => now(),
                'id_admin' => 'ADM001',
            ],
            [
                'id_voiture' => 5,
                'marque' => 'Hyundai',
                'modele' => 'i20',
                'immatriculation' => '24680-13-IJ',
                'prix_par_jour' => 350.00,
                'image' => null,
                'statut' => 'disponible',
                'date_ajout' => now(),
                'id_admin' => 'ADM001',
            ],
        ];

        foreach ($voitures as $voiture) {
            DB::table('voiture')->updateOrInsert(
                ['id_voiture' => $voiture['id_voiture']],
                $voiture
            );
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('location')->insert([
            [
                'date_reservation' => now(),
                'date_debut'       => '2025-01-05',
                'date_fin'         => '2025-01-10',
                'montant_total'    => 1500.00,
                'nom_client'       => 'El Oukili',
                'prenom_client'    => 'Nada',
                'telephone_client' => '0612345678',
                'email_client'     => 'nada@example.com',
                'cin_client'       => 'AA123456',
                'valide'           => true,
                'id_voiture'       => 1,
                'id_admin'         => 'ADM001',
            ],

            [
                'date_reservation' => now(),
                'date_debut'       => '2025-02-01',
                'date_fin'         => '2025-02-03',
                'montant_total'    => 900.00,
                'nom_client'       => 'Benali',
                'prenom_client'    => 'Mehdi',
                'telephone_client' => '0678654321',
                'email_client'     => 'mehdi@example.com',
                'cin_client'       => 'BB654321',
                'valide'           => false,
                'id_voiture'       => 2,
                'id_admin'         => 'ADM001',
            ]
        ]);
    }
}

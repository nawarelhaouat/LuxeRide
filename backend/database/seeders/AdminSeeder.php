<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'id_admin'  => 'ADM001',
                'nom'       => 'El Oukili',
                'prenom'    => 'Nada',
                'email'     => 'eloukilinada2004@gmail.com',
                'telephone' => '0600000001',
                'code'      => '1234'
            ]
        ];

        foreach ($admins as $admin) {
            DB::table('admin')->updateOrInsert(
                ['id_admin' => $admin['id_admin']],
                [
                    'nom'       => $admin['nom'],
                    'prenom'    => $admin['prenom'],
                    'email'     => $admin['email'],
                    'telephone' => $admin['telephone'],
                    'code'      => $admin['code'],
                ]
            );
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admin')->insert([
            [
                'id_admin'  => 'ADM001',
                'nom'       => 'El Oukili',
                'prenom'    => 'Nada',
                'email'     => 'eloukilinada2004@gmail.com',
                'telephone' => '0600000001',
                'code'      => '1234'
            ]
        ]);
    }
}

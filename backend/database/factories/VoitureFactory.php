<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class VoitureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'marque'           => $this->faker->company(),
            'modele'           => ucfirst($this->faker->word()),
            'immatriculation'  => strtoupper($this->faker->unique()->bothify('??###??')),
            'prix_par_jour'    => $this->faker->numberBetween(150, 1000),
            'image'            => null,
            'statut'           => $this->faker->randomElement(['disponible', 'loue', 'en_maintenance']),
            'date_ajout'       => now(),

            'id_admin' => DB::table('admin')->inRandomOrder()->value('id_admin'),
        ];
    }
}
